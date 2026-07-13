import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { users } from './users.schema';

export const userProfiles = pgTable('user_profiles', {
	userId: uuid('user_id')
		.primaryKey()
		.references(() => users.id, { onDelete: 'cascade' }),
	displayName: varchar('display_name', { length: 100 }),
	avatarUrl: text('avatar_url'),
	bio: varchar('bio', { length: 280 }),
	timezone: varchar('timezone', { length: 64 }),
	locale: varchar('locale', { length: 16 }),
	createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
	updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type UserProfileRecord = typeof userProfiles.$inferSelect;
export type NewUserProfileRecord = typeof userProfiles.$inferInsert;
