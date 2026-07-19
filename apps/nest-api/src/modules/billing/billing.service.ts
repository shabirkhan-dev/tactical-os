import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common';

import { AppConfigService } from '@/config/app-config.service';
import { UsersService } from '../users/users.service';
import type { CreateCheckoutInput, CreatePortalInput } from './billing.dto';
import { BillingRepository } from './billing.repository';
import type {
	BillingInterval,
	NormalizedWebhookEvent,
	PaymentProviderName,
	PlanCode,
} from './payment-provider';
import { PaymentProvider } from './payment-provider';
import { RazorpayPaymentProvider } from './razorpay.provider';
import { StripePaymentProvider } from './stripe.provider';

@Injectable()
export class BillingService {
	private readonly logger = new Logger(BillingService.name);
	private readonly providers: Map<PaymentProviderName, PaymentProvider>;

	constructor(
		private readonly config: AppConfigService,
		private readonly users: UsersService,
		private readonly repository: BillingRepository,
		stripe: StripePaymentProvider,
		razorpay: RazorpayPaymentProvider,
	) {
		this.providers = new Map<PaymentProviderName, PaymentProvider>([
			['stripe', stripe],
			['razorpay', razorpay],
		]);
	}

	getSubscription(userId: string) {
		return this.repository.findLatestForUser(userId);
	}

	async createCheckout(userId: string, input: CreateCheckoutInput) {
		const user = await this.users.findById(userId);
		if (!user?.isActive) {
			throw new NotFoundException({
				code: 'USER_NOT_FOUND',
				message: 'User not found',
			});
		}

		const providerName = input.provider ?? this.config.billingDefaultProvider;
		const provider = this.requireProvider(providerName);
		const priceId = this.resolvePriceId(providerName, input.planCode, input.billingInterval);
		const successUrl =
			input.successUrl ?? `${this.config.webAppUrl}/billing/success?provider=${providerName}`;
		const cancelUrl =
			input.cancelUrl ?? `${this.config.webAppUrl}/billing/cancel?provider=${providerName}`;

		return provider.createCheckout({
			userId,
			email: user.email,
			planCode: input.planCode,
			billingInterval: input.billingInterval,
			successUrl,
			cancelUrl,
			priceId,
		});
	}

	async createPortal(userId: string, input: CreatePortalInput) {
		const providerName = input.provider ?? this.config.billingDefaultProvider;
		const provider = this.requireProvider(providerName);
		const subscription = await this.repository.findActiveCustomerForUser(userId, providerName);
		if (!subscription?.providerCustomerId) {
			throw new BadRequestException({
				code: 'BILLING_NO_CUSTOMER',
				message: 'No billing customer found for this provider. Complete checkout first.',
			});
		}

		return provider.createPortal({
			providerCustomerId: subscription.providerCustomerId,
			returnUrl: input.returnUrl ?? `${this.config.webAppUrl}/billing`,
		});
	}

	async handleWebhook(
		providerName: PaymentProviderName,
		rawBody: Buffer,
		headers: Record<string, string | string[] | undefined>,
	) {
		const provider = this.requireProvider(providerName);
		const event = await provider.parseWebhook(rawBody, headers);
		if (!event) {
			return { received: true, handled: false };
		}

		await this.applyWebhookEvent(event);
		return { received: true, handled: true };
	}

	listConfiguredProviders(): PaymentProviderName[] {
		return [...this.providers.entries()]
			.filter(([, provider]) => provider.isConfigured() || this.hasKeys(provider.name))
			.map(([name]) => name);
	}

	private async applyWebhookEvent(event: NormalizedWebhookEvent): Promise<void> {
		const userId = event.userId;
		if (!userId) {
			this.logger.warn(
				`Ignoring ${event.provider} webhook without userId (${event.idempotencyKey})`,
			);
			return;
		}

		const planCode = event.planCode ?? 'team';
		const billingInterval = event.billingInterval ?? 'monthly';

		await this.repository.upsertFromWebhook({
			userId,
			provider: event.provider,
			providerCustomerId: event.providerCustomerId,
			providerSubscriptionId: event.providerSubscriptionId,
			planCode,
			billingInterval,
			status: event.status,
			currentPeriodEnd: event.currentPeriodEnd,
			cancelAtPeriodEnd: event.cancelAtPeriodEnd,
		});
	}

	private requireProvider(name: PaymentProviderName): PaymentProvider {
		const provider = this.providers.get(name);
		if (!provider) {
			throw new BadRequestException({
				code: 'BILLING_PROVIDER_UNKNOWN',
				message: `Unknown payment provider: ${name}`,
			});
		}
		if (!this.hasKeys(name)) {
			throw new ServiceUnavailableException({
				code: 'BILLING_PROVIDER_NOT_CONFIGURED',
				message: `${name} is not configured`,
			});
		}
		return provider;
	}

	private hasKeys(name: PaymentProviderName): boolean {
		if (name === 'stripe') {
			return Boolean(this.config.stripeSecretKey);
		}
		return Boolean(this.config.razorpayKeyId && this.config.razorpayKeySecret);
	}

	private resolvePriceId(
		provider: PaymentProviderName,
		planCode: PlanCode,
		interval: BillingInterval,
	): string {
		const prices = this.config.billingPrices[provider];
		const priceId = prices?.[planCode]?.[interval];
		if (!priceId) {
			throw new ServiceUnavailableException({
				code: 'BILLING_PRICE_NOT_CONFIGURED',
				message: `Missing price/plan id for ${provider} ${planCode} ${interval}`,
			});
		}
		return priceId;
	}
}
