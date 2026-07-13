import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from '../../database/database.service';
import { userProfiles } from '../../database/schema';

@Injectable()
export class ProfilesRepository {
	constructor(private readonly database: DatabaseService) {}

	async findByUserId(userId: string) {
		const [profile] = await this.database.db
			.select()
			.from(userProfiles)
			.where(eq(userProfiles.userId, userId))
			.limit(1);
		return profile ?? null;
	}

	async upsert(userId: string, input: Omit<typeof userProfiles.$inferInsert, 'userId'>) {
		const [profile] = await this.database.db
			.insert(userProfiles)
			.values({ userId, ...input })
			.onConflictDoUpdate({
				target: userProfiles.userId,
				set: { ...input, updatedAt: new Date() },
			})
			.returning();
		if (!profile) throw new Error('Profile update did not return a record');
		return profile;
	}
}
