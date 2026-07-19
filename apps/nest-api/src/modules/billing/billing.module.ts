import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { BillingController } from './billing.controller';
import { BillingRepository } from './billing.repository';
import { BillingService } from './billing.service';
import { RazorpayPaymentProvider } from './razorpay.provider';
import { StripePaymentProvider } from './stripe.provider';

@Module({
	imports: [AuthModule, UsersModule],
	controllers: [BillingController],
	providers: [BillingRepository, BillingService, StripePaymentProvider, RazorpayPaymentProvider],
	exports: [BillingService],
})
export class BillingModule {}
