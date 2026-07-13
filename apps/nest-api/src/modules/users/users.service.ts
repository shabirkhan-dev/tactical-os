import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import type { UserRecord } from '../../database/schema';
import { UsersRepository } from './users.repository';
import { type PublicUser, toPublicUser } from './users.types';

@Injectable()
export class UsersService {
	constructor(private readonly usersRepository: UsersRepository) {}

	async createUser(input: {
		email: string;
		username: string;
		passwordHash: string;
	}): Promise<UserRecord> {
		const email = normalizeEmail(input.email);
		const username = normalizeUsername(input.username);

		if (await this.usersRepository.findByEmail(email)) {
			throw new ConflictException({
				code: 'AUTH_EMAIL_ALREADY_REGISTERED',
				message: 'An account with this email already exists',
			});
		}

		if (await this.usersRepository.findByUsername(username)) {
			throw new ConflictException({
				code: 'AUTH_USERNAME_TAKEN',
				message: 'This username is already taken',
			});
		}

		try {
			return await this.usersRepository.create({
				email,
				username,
				passwordHash: input.passwordHash,
			});
		} catch (error) {
			if (isUniqueConstraintError(error)) {
				throw new ConflictException({
					code: 'AUTH_ACCOUNT_ALREADY_EXISTS',
					message: 'An account with these details already exists',
				});
			}
			throw error;
		}
	}

	findByEmail(email: string): Promise<UserRecord | null> {
		return this.usersRepository.findByEmail(normalizeEmail(email));
	}

	findById(userId: string): Promise<UserRecord | null> {
		return this.usersRepository.findById(userId);
	}

	async getCurrentUser(userId: string): Promise<PublicUser> {
		const user = await this.usersRepository.findById(userId);
		if (!user?.isActive) {
			throw new UnauthorizedException({
				code: 'AUTH_SESSION_INVALID',
				message: 'Authentication required',
			});
		}
		return toPublicUser(user);
	}

	async recordFailedLogin(
		user: UserRecord,
		maxAttempts: number,
		lockMinutes: number,
	): Promise<void> {
		const attempts = user.failedLoginAttempts + 1;
		const lockedUntil =
			attempts >= maxAttempts ? new Date(Date.now() + lockMinutes * 60_000) : user.lockedUntil;
		await this.usersRepository.updateLoginSecurity(user.id, {
			failedLoginAttempts: attempts,
			lockedUntil,
		});
	}

	async resetFailedLogins(userId: string): Promise<void> {
		await this.usersRepository.updateLoginSecurity(userId, {
			failedLoginAttempts: 0,
			lockedUntil: null,
		});
	}

	markEmailVerified(userId: string): Promise<UserRecord | null> {
		return this.usersRepository.markEmailVerified(userId);
	}

	updatePassword(userId: string, passwordHash: string): Promise<void> {
		return this.usersRepository.updatePassword(userId, passwordHash);
	}
}

function normalizeEmail(email: string): string {
	return email.trim().toLowerCase();
}

function normalizeUsername(username: string): string {
	return username.trim().toLowerCase();
}

function isUniqueConstraintError(error: unknown): boolean {
	return (
		typeof error === 'object' &&
		error !== null &&
		'code' in error &&
		(error as { code?: unknown }).code === '23505'
	);
}
