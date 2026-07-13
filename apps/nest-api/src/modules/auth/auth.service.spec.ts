import { AppConfigService } from '../../config/app-config.service';
import type { AuthChallengeRecord, UserRecord } from '../../database/schema';
import { UsersService } from '../users/users.service';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthCryptoService } from './auth-crypto.service';
import { AuthEmailService } from './auth-email.service';

const user: UserRecord = {
	id: 'a01a0cab-a947-44f0-bfcd-4b8e8c907534',
	email: 'starter@example.com',
	username: 'starter',
	passwordHash: 'password-hash',
	emailVerifiedAt: null,
	isActive: true,
	failedLoginAttempts: 0,
	lockedUntil: null,
	passwordChangedAt: new Date('2026-07-13T00:00:00.000Z'),
	createdAt: new Date('2026-07-13T00:00:00.000Z'),
	updatedAt: new Date('2026-07-13T00:00:00.000Z'),
};

describe('AuthService', () => {
	let authRepository: jest.Mocked<AuthRepository>;
	let crypto: jest.Mocked<AuthCryptoService>;
	let email: jest.Mocked<AuthEmailService>;
	let usersService: jest.Mocked<UsersService>;
	let service: AuthService;

	beforeEach(() => {
		authRepository = {
			createChallenge: jest.fn(),
		} as unknown as jest.Mocked<AuthRepository>;
		crypto = {
			hashPassword: jest.fn().mockResolvedValue('password-hash'),
			generateOtp: jest.fn().mockReturnValue('123456'),
			hashOtp: jest.fn().mockReturnValue('otp-hash'),
		} as unknown as jest.Mocked<AuthCryptoService>;
		email = {
			sendVerificationCode: jest.fn().mockResolvedValue(undefined),
			sendPasswordResetCode: jest.fn().mockResolvedValue(undefined),
		} as unknown as jest.Mocked<AuthEmailService>;
		usersService = {
			createUser: jest.fn().mockResolvedValue(user),
		} as unknown as jest.Mocked<UsersService>;
		service = new AuthService(new AppConfigService(), crypto, email, authRepository, usersService);
	});

	it('registers a user and persists only a hashed verification code', async () => {
		authRepository.createChallenge.mockResolvedValue({
			id: '84c5bd4b-2a8f-4a89-85db-c22f45dc2ab9',
			userId: user.id,
			email: user.email,
			purpose: 'email_verification',
			codeHash: 'otp-hash',
			attempts: 0,
			expiresAt: new Date(Date.now() + 600_000),
			consumedAt: null,
			createdAt: new Date(),
		} satisfies AuthChallengeRecord);

		const result = await service.register({
			email: user.email,
			username: user.username,
			password: 'a-strong-test-password',
		});

		expect(authRepository.createChallenge).toHaveBeenCalledWith(
			expect.objectContaining({ codeHash: 'otp-hash' }),
		);
		expect(authRepository.createChallenge).not.toHaveBeenCalledWith(
			expect.objectContaining({ codeHash: '123456' }),
		);
		expect(email.sendVerificationCode).toHaveBeenCalledWith(user.email, '123456');
		expect(result.user).not.toHaveProperty('passwordHash');
		expect(result.developmentCode).toBe('123456');
	});

	it('never includes a refresh token in the public session response', () => {
		const result = service.toPublicSession({
			accessToken: 'access-token',
			accessTokenExpiresAt: '2026-07-13T00:15:00.000Z',
			refreshToken: 'refresh-token',
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
				isActive: true,
				emailVerified: false,
				createdAt: user.createdAt.toISOString(),
			},
		});

		expect(result).not.toHaveProperty('refreshToken');
	});
});
