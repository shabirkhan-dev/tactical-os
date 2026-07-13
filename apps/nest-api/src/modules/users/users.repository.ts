import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from '../../database/database.service';
import { type UserRecord, users } from '../../database/schema';

@Injectable()
export class UsersRepository {
	constructor(private readonly database: DatabaseService) {}

	async create(input: {
		email: string;
		username: string;
		passwordHash: string;
	}): Promise<UserRecord> {
		const [user] = await this.database.db.insert(users).values(input).returning();
		if (!user) {
			throw new Error('User insert did not return a record');
		}
		return user;
	}

	async findById(userId: string): Promise<UserRecord | null> {
		const [user] = await this.database.db.select().from(users).where(eq(users.id, userId)).limit(1);
		return user ?? null;
	}

	async findByEmail(email: string): Promise<UserRecord | null> {
		const [user] = await this.database.db
			.select()
			.from(users)
			.where(eq(users.email, email))
			.limit(1);
		return user ?? null;
	}

	async findByUsername(username: string): Promise<UserRecord | null> {
		const [user] = await this.database.db
			.select()
			.from(users)
			.where(eq(users.username, username))
			.limit(1);
		return user ?? null;
	}

	async updateLoginSecurity(
		userId: string,
		input: { failedLoginAttempts: number; lockedUntil: Date | null },
	): Promise<void> {
		await this.database.db
			.update(users)
			.set({ ...input, updatedAt: new Date() })
			.where(eq(users.id, userId));
	}

	async markEmailVerified(userId: string): Promise<UserRecord | null> {
		const [user] = await this.database.db
			.update(users)
			.set({ emailVerifiedAt: new Date(), updatedAt: new Date() })
			.where(eq(users.id, userId))
			.returning();
		return user ?? null;
	}

	async updatePassword(userId: string, passwordHash: string): Promise<void> {
		const now = new Date();
		await this.database.db
			.update(users)
			.set({ passwordHash, passwordChangedAt: now, updatedAt: now })
			.where(eq(users.id, userId));
	}
}
