import {
	boolean,
	index,
	integer,
	pgTable,
	text,
	timestamp,
	uniqueIndex,
	uuid,
	varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable(
	'users',
	{
		id: uuid('id').defaultRandom().primaryKey(),
		email: varchar('email', { length: 320 }).notNull(),
		username: varchar('username', { length: 64 }).notNull(),
		passwordHash: text('password_hash'),
		emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
		isActive: boolean('is_active').notNull().default(true),
		failedLoginAttempts: integer('failed_login_attempts').notNull().default(0),
		lockedUntil: timestamp('locked_until', { withTimezone: true }),
		passwordChangedAt: timestamp('password_changed_at', { withTimezone: true })
			.notNull()
			.defaultNow(),
		createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
		updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
	},
	(table) => [
		uniqueIndex('users_email_unique').on(table.email),
		uniqueIndex('users_username_unique').on(table.username),
		index('users_created_at_idx').on(table.createdAt),
	],
);

export type UserRecord = typeof users.$inferSelect;
export type NewUserRecord = typeof users.$inferInsert;
