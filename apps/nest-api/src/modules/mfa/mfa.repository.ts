import { Injectable } from '@nestjs/common';
import { and, eq, isNull } from 'drizzle-orm';

import { DatabaseService } from '@/database/database.service';
import { totpFactors, totpRecoveryCodes } from '@/database/schema';

@Injectable()
export class MfaRepository {
	constructor(private readonly database: DatabaseService) {}

	async getTotpFactor(userId: string) {
		const [factor] = await this.database.db
			.select()
			.from(totpFactors)
			.where(eq(totpFactors.userId, userId))
			.limit(1);
		return factor ?? null;
	}

	async savePendingTotp(userId: string, secretEncrypted: string): Promise<void> {
		await this.database.db
			.insert(totpFactors)
			.values({ userId, secretEncrypted })
			.onConflictDoUpdate({
				target: totpFactors.userId,
				set: {
					secretEncrypted,
					isEnabled: false,
					verifiedAt: null,
					updatedAt: new Date(),
				},
			});
	}

	async enableTotp(userId: string, recoveryCodeHashes: string[]): Promise<void> {
		await this.database.db.transaction(async (transaction) => {
			const now = new Date();
			await transaction
				.update(totpFactors)
				.set({ isEnabled: true, verifiedAt: now, updatedAt: now })
				.where(eq(totpFactors.userId, userId));
			await transaction.delete(totpRecoveryCodes).where(eq(totpRecoveryCodes.userId, userId));
			await transaction
				.insert(totpRecoveryCodes)
				.values(recoveryCodeHashes.map((codeHash) => ({ userId, codeHash })));
		});
	}

	async disableTotp(userId: string): Promise<void> {
		await this.database.db.transaction(async (transaction) => {
			await transaction.delete(totpRecoveryCodes).where(eq(totpRecoveryCodes.userId, userId));
			await transaction.delete(totpFactors).where(eq(totpFactors.userId, userId));
		});
	}

	async consumeRecoveryCode(userId: string, codeHash: string): Promise<boolean> {
		const [used] = await this.database.db
			.update(totpRecoveryCodes)
			.set({ usedAt: new Date() })
			.where(
				and(
					eq(totpRecoveryCodes.userId, userId),
					eq(totpRecoveryCodes.codeHash, codeHash),
					isNull(totpRecoveryCodes.usedAt),
				),
			)
			.returning({ id: totpRecoveryCodes.id });
		return Boolean(used);
	}

	async countRecoveryCodes(userId: string): Promise<number> {
		const rows = await this.database.db
			.select({ id: totpRecoveryCodes.id })
			.from(totpRecoveryCodes)
			.where(and(eq(totpRecoveryCodes.userId, userId), isNull(totpRecoveryCodes.usedAt)));
		return rows.length;
	}
}
