import {
	bigint,
	boolean,
	index,
	jsonb,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

import { users } from './users.schema';

export const passkeys = pgTable(
	'passkeys',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		userId: uuid('user_id')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		credentialId: text('credential_id').notNull(),
		publicKey: text('public_key').notNull(),
		counter: bigint('counter', { mode: 'number' }).notNull().default(0),
		transports: jsonb('transports').$type<string[]>().notNull().default([]),
		deviceType: varchar('device_type', { length: 32 }).notNull(),
		backedUp: boolean('backed_up').notNull(),
		name: varchar('name', { length: 100 }).notNull(),
		lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		uniqueIndex('passkeys_credential_id_unique').on(table.credentialId),
		index('passkeys_user_id_idx').on(table.userId),
	],
);

export type PasskeyRecord = typeof passkeys.$inferSelect;
