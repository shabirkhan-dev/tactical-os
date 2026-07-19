import {
	Body,
	Controller,
	Get,
	Headers,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Req,
	UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import type { AccessTokenPayload } from '@/modules/auth/auth.types';
import { CurrentUser } from '@/modules/auth/current-user.decorator';
import { JwtAuthGuard } from '@/modules/auth/jwt-auth.guard';
import { CreateCheckoutDto, CreatePortalDto } from './billing.dto';
import { BillingService } from './billing.service';

@ApiTags('Billing')
@Controller({ path: 'billing', version: '1' })
export class BillingController {
	constructor(private readonly billing: BillingService) {}

	@Get('providers')
	@ApiOperation({ summary: 'List configured payment providers' })
	listProviders() {
		return { providers: this.billing.listConfiguredProviders() };
	}

	@Get('subscription')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ summary: 'Get the current user subscription' })
	async getSubscription(@CurrentUser() user: AccessTokenPayload) {
		const subscription = await this.billing.getSubscription(user.sub);
		return { subscription };
	}

	@Post('checkout')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Create a Stripe or Razorpay checkout session' })
	createCheckout(@CurrentUser() user: AccessTokenPayload, @Body() body: CreateCheckoutDto) {
		return this.billing.createCheckout(user.sub, body);
	}

	@Post('portal')
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Open the Stripe customer portal (Razorpay unsupported)' })
	createPortal(@CurrentUser() user: AccessTokenPayload, @Body() body: CreatePortalDto) {
		return this.billing.createPortal(user.sub, body);
	}

	@Post('webhooks/:provider')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Payment provider webhook receiver' })
	handleWebhook(
		@Param('provider') provider: string,
		@Req() req: { rawBody?: Buffer },
		@Headers() headers: Record<string, string | string[] | undefined>,
	) {
		if (provider !== 'stripe' && provider !== 'razorpay') {
			return { received: false, handled: false };
		}
		const rawBody = req.rawBody ?? Buffer.from('');
		return this.billing.handleWebhook(provider, rawBody, headers);
	}
}
