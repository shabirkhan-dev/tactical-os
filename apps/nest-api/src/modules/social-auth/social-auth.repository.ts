import { Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';

import { DatabaseService } from '../../database/database.service';
import {
	type AuthIdentityProvider,
	type AuthIdentityRecord,
	authIdentities,
} from '../../database/schema';

@Injectable()
export class SocialAuthRepository {
	constructor(private readonly database: DatabaseService) {}

	async findIdentity(
		provider: AuthIdentityProvider,
		providerUserId: string,
	): Promise<AuthIdentityRecord | null> {
		const [identity] = await this.database.db
			.select()
			.from(authIdentities)
			.where(
				and(
					eq(authIdentities.provider, provider),
					eq(authIdentities.providerUserId, providerUserId),
				),
			)
			.limit(1);
		return identity ?? null;
	}

	async findForUser(
		userId: string,
		provider: AuthIdentityProvider,
	): Promise<AuthIdentityRecord | null> {
		const [identity] = await this.database.db
			.select()
			.from(authIdentities)
			.where(and(eq(authIdentities.userId, userId), eq(authIdentities.provider, provider)))
			.limit(1);
		return identity ?? null;
	}

	async create(input: {
		userId: string;
		provider: AuthIdentityProvider;
		providerUserId: string;
		email: string;
	}): Promise<AuthIdentityRecord> {
		const [identity] = await this.database.db.insert(authIdentities).values(input).returning();
		if (!identity) throw new Error('Auth identity insert did not return a record');
		return identity;
	}

	async delete(userId: string, provider: AuthIdentityProvider): Promise<boolean> {
		const deleted = await this.database.db
			.delete(authIdentities)
			.where(and(eq(authIdentities.userId, userId), eq(authIdentities.provider, provider)))
			.returning({ id: authIdentities.id });
		return deleted.length > 0;
	}
}
