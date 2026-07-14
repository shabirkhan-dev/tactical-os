export type PaymentProviderName = 'stripe' | 'razorpay';

export type PlanCode = 'team' | 'enterprise';

export type BillingInterval = 'monthly' | 'yearly';

export type SubscriptionStatus =
	| 'incomplete'
	| 'trialing'
	| 'active'
	| 'past_due'
	| 'canceled'
	| 'unpaid';

export type CheckoutInput = {
	userId: string;
	email: string;
	planCode: PlanCode;
	billingInterval: BillingInterval;
	successUrl: string;
	cancelUrl: string;
	priceId: string;
};

export type CheckoutResult = {
	provider: PaymentProviderName;
	checkoutUrl: string;
	providerSessionId?: string;
};

export type PortalInput = {
	providerCustomerId: string;
	returnUrl: string;
};

export type NormalizedWebhookEvent = {
	provider: PaymentProviderName;
	idempotencyKey: string;
	userId?: string;
	providerCustomerId?: string;
	providerSubscriptionId?: string;
	planCode?: PlanCode;
	billingInterval?: BillingInterval;
	status: SubscriptionStatus;
	currentPeriodEnd?: Date;
	cancelAtPeriodEnd?: boolean;
};

export abstract class PaymentProvider {
	abstract readonly name: PaymentProviderName;

	abstract isConfigured(): boolean;

	abstract createCheckout(input: CheckoutInput): Promise<CheckoutResult>;

	abstract createPortal(input: PortalInput): Promise<{ url: string }>;

	abstract parseWebhook(
		rawBody: Buffer,
		headers: Record<string, string | string[] | undefined>,
	): Promise<NormalizedWebhookEvent | null>;
}
