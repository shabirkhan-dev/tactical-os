import { Injectable } from '@nestjs/common';
import { and, desc, eq, isNotNull } from 'drizzle-orm';

import { DatabaseService } from '../../database/database.service';
import {
	type NewSubscriptionRecord,
	type SubscriptionRecord,
	subscriptions,
} from '../../database/schema';
import type {
	BillingInterval,
	PaymentProviderName,
	PlanCode,
	SubscriptionStatus,
} from './payment-provider';

@Injectable()
export class BillingRepository {
	constructor(private readonly database: DatabaseService) {}

	findLatestForUser(userId: string): Promise<SubscriptionRecord | null> {
		return this.database.db
			.select()
			.from(subscriptions)
			.where(eq(subscriptions.userId, userId))
			.orderBy(desc(subscriptions.updatedAt))
			.limit(1)
			.then((rows) => rows[0] ?? null);
	}

	findByProviderSubscription(
		provider: PaymentProviderName,
		providerSubscriptionId: string,
	): Promise<SubscriptionRecord | null> {
		return this.database.db
			.select()
			.from(subscriptions)
			.where(
				and(
					eq(subscriptions.provider, provider),
					eq(subscriptions.providerSubscriptionId, providerSubscriptionId),
				),
			)
			.limit(1)
			.then((rows) => rows[0] ?? null);
	}

	findActiveCustomerForUser(
		userId: string,
		provider: PaymentProviderName,
	): Promise<SubscriptionRecord | null> {
		return this.database.db
			.select()
			.from(subscriptions)
			.where(
				and(
					eq(subscriptions.userId, userId),
					eq(subscriptions.provider, provider),
					isNotNull(subscriptions.providerCustomerId),
				),
			)
			.orderBy(desc(subscriptions.updatedAt))
			.limit(1)
			.then((rows) => rows[0] ?? null);
	}

	async upsertFromWebhook(input: {
		userId: string;
		provider: PaymentProviderName;
		providerCustomerId?: string;
		providerSubscriptionId?: string;
		planCode: PlanCode;
		billingInterval: BillingInterval;
		status: SubscriptionStatus;
		currentPeriodEnd?: Date;
		cancelAtPeriodEnd?: boolean;
	}): Promise<SubscriptionRecord> {
		const existing = input.providerSubscriptionId
			? await this.findByProviderSubscription(input.provider, input.providerSubscriptionId)
			: null;

		if (existing) {
			const [updated] = await this.database.db
				.update(subscriptions)
				.set({
					userId: input.userId,
					providerCustomerId: input.providerCustomerId ?? existing.providerCustomerId,
					planCode: input.planCode,
					billingInterval: input.billingInterval,
					status: input.status,
					currentPeriodEnd: input.currentPeriodEnd ?? existing.currentPeriodEnd,
					cancelAtPeriodEnd: input.cancelAtPeriodEnd ?? existing.cancelAtPeriodEnd,
					updatedAt: new Date(),
				})
				.where(eq(subscriptions.id, existing.id))
				.returning();
			return updated;
		}

		const values: NewSubscriptionRecord = {
			userId: input.userId,
			provider: input.provider,
			providerCustomerId: input.providerCustomerId,
			providerSubscriptionId: input.providerSubscriptionId,
			planCode: input.planCode,
			billingInterval: input.billingInterval,
			status: input.status,
			currentPeriodEnd: input.currentPeriodEnd,
			cancelAtPeriodEnd: input.cancelAtPeriodEnd ?? false,
		};

		const [created] = await this.database.db.insert(subscriptions).values(values).returning();
		return created;
	}
}
