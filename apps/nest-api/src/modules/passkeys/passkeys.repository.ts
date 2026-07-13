import { Injectable } from '@nestjs/common';
import { and, desc, eq, isNull } from 'drizzle-orm';

import { DatabaseService } from '../../database/database.service';
import { authChallenges, type PasskeyRecord, passkeys } from '../../database/schema';

@Injectable()
export class PasskeysRepository {
	constructor(private readonly database: DatabaseService) {}

	listForUser(userId: string): Promise<PasskeyRecord[]> {
		return this.database.db
			.select()
			.from(passkeys)
			.where(eq(passkeys.userId, userId))
			.orderBy(desc(passkeys.createdAt));
	}

	async findByCredentialId(credentialId: string): Promise<PasskeyRecord | null> {
		const [passkey] = await this.database.db
			.select()
			.from(passkeys)
			.where(eq(passkeys.credentialId, credentialId))
			.limit(1);
		return passkey ?? null;
	}

	async create(input: typeof passkeys.$inferInsert): Promise<PasskeyRecord> {
		const [passkey] = await this.database.db.insert(passkeys).values(input).returning();
		if (!passkey) throw new Error('Passkey insert did not return a record');
		return passkey;
	}

	async updateUsage(id: string, counter: number): Promise<void> {
		await this.database.db
			.update(passkeys)
			.set({ counter, lastUsedAt: new Date() })
			.where(eq(passkeys.id, id));
	}

	async delete(userId: string, passkeyId: string): Promise<boolean> {
		const deleted = await this.database.db
			.delete(passkeys)
			.where(and(eq(passkeys.id, passkeyId), eq(passkeys.userId, userId)))
			.returning({ id: passkeys.id });
		return deleted.length > 0;
	}

	async createChallenge(input: {
		userId: string;
		email: string;
		purpose: 'webauthn_registration' | 'webauthn_authentication';
		challengeHash: string;
		expiresAt: Date;
	}) {
		return this.database.db.transaction(async (transaction) => {
			await transaction
				.update(authChallenges)
				.set({ consumedAt: new Date() })
				.where(
					and(
						eq(authChallenges.userId, input.userId),
						eq(authChallenges.purpose, input.purpose),
						isNull(authChallenges.consumedAt),
					),
				);
			const [challenge] = await transaction
				.insert(authChallenges)
				.values({
					userId: input.userId,
					email: input.email,
					purpose: input.purpose,
					codeHash: input.challengeHash,
					expiresAt: input.expiresAt,
				})
				.returning();
			if (!challenge) throw new Error('WebAuthn challenge insert failed');
			return challenge;
		});
	}

	async findChallenge(challengeId: string) {
		const [challenge] = await this.database.db
			.select()
			.from(authChallenges)
			.where(eq(authChallenges.id, challengeId))
			.limit(1);
		return challenge ?? null;
	}

	async consumeChallenge(challengeId: string): Promise<boolean> {
		const consumed = await this.database.db
			.update(authChallenges)
			.set({ consumedAt: new Date() })
			.where(and(eq(authChallenges.id, challengeId), isNull(authChallenges.consumedAt)))
			.returning({ id: authChallenges.id });
		return consumed.length > 0;
	}
}
