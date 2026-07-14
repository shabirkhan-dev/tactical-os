import {
	boolean,
	index,
	pgTable,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

import { users } from './users.schema';

export const subscriptions = pgTable(
	'subscriptions',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		provider: varchar('provider', { length: 32 }).notNull(),
		providerCustomerId: varchar('provider_customer_id', { length: 191 }),
		providerSubscriptionId: varchar('provider_subscription_id', { length: 191 }),
		planCode: varchar('plan_code', { length: 64 }).notNull(),
		billingInterval: varchar('billing_interval', { length: 16 }).notNull(),
		status: varchar('status', { length: 32 }).notNull().default('incomplete'),
		currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
		cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		index('subscriptions_user_id_idx').on(table.userId),
		index('subscriptions_status_idx').on(table.status),
		uniqueIndex('subscriptions_provider_sub_unique').on(
			table.provider,
			table.providerSubscriptionId,
		),
	],
);

export type SubscriptionRecord = typeof subscriptions.$inferSelect;
export type NewSubscriptionRecord = typeof subscriptions.$inferInsert;
