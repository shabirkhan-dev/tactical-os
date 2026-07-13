import { index, pgEnum, pgTable, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from './users.schema';

export const authIdentityProvider = pgEnum('auth_identity_provider', ['google']);

export const authIdentities = pgTable(
	'auth_identities',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		provider: authIdentityProvider('provider').notNull(),
		providerUserId: varchar('provider_user_id', { length: 255 }).notNull(),
		email: varchar('email', { length: 320 }).notNull(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		uniqueIndex('auth_identities_provider_subject_unique').on(table.provider, table.providerUserId),
		uniqueIndex('auth_identities_user_provider_unique').on(table.userId, table.provider),
		index('auth_identities_user_id_idx').on(table.userId),
	],
);

export type AuthIdentityRecord = typeof authIdentities.$inferSelect;
export type AuthIdentityProvider = AuthIdentityRecord['provider'];
