import { randomUUID } from 'node:crypto';
import {
	ForbiddenException,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

import { AppConfigService } from '../../config/app-config.service';
import type {
	AuthChallengePurpose,
	AuthChallengeRecord,
	SessionRecord,
	UserRecord,
} from '../../database/schema';
import { UsersService } from '../users/users.service';
import { type PublicUser, toPublicUser } from '../users/users.types';
import { AuthRepository } from './auth.repository';
import type {
	AccessTokenPayload,
	AuthChallengeResult,
	AuthSessionResult,
	PublicAuthSession,
	RegistrationResult,
	RequestMetadata,
	SessionView,
} from './auth.types';
import { AuthCryptoService } from './auth-crypto.service';
import { AuthEmailService } from './auth-email.service';
import type {
	ChangePasswordBody,
	EmailBody,
	LoginBody,
	RegisterBody,
	ResetPasswordBody,
	VerifyEmailBody,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly config: AppConfigService,
		private readonly crypto: AuthCryptoService,
		private readonly email: AuthEmailService,
		private readonly authRepository: AuthRepository,
		private readonly usersService: UsersService,
	) {}

	async register(body: RegisterBody): Promise<RegistrationResult> {
		const passwordHash = await this.crypto.hashPassword(body.password);
		const user = await this.usersService.createUser({
			email: body.email,
			username: body.username,
			passwordHash,
		});
		const challenge = await this.issueChallenge(user, 'email_verification');
		return { ...challenge, user: toPublicUser(user) };
	}

	async verifyEmail(body: VerifyEmailBody): Promise<PublicUser> {
		const user = await this.usersService.findByEmail(body.email);
		if (!user) {
			throw invalidOtpException();
		}
		if (user.emailVerifiedAt) {
			return toPublicUser(user);
		}

		const challenge = await this.validateChallenge(body.email, 'email_verification', body.code);
		await this.authRepository.completeEmailVerification(challenge.id, user.id);
		const verifiedUser = await this.usersService.findById(user.id);
		if (!verifiedUser) {
			throw new Error('Verified user could not be loaded');
		}
		return toPublicUser(verifiedUser);
	}

	async resendVerification(body: EmailBody): Promise<AuthChallengeResult> {
		const user = await this.usersService.findByEmail(body.email);
		if (!user || user.emailVerifiedAt) {
			return acceptedChallenge('If the account requires verification, a code has been sent.');
		}
		return this.issueChallenge(user, 'email_verification');
	}

	async login(body: LoginBody, metadata: RequestMetadata): Promise<AuthSessionResult> {
		const user = await this.usersService.findByEmail(body.email);
		if (!user) {
			await this.crypto.hashPassword(body.password);
			throw invalidCredentialsException();
		}

		if (user.lockedUntil && user.lockedUntil > new Date()) {
			throw new HttpException(
				{
					code: 'AUTH_ACCOUNT_LOCKED',
					message: 'Too many failed attempts. Try again later.',
				},
				HttpStatus.LOCKED,
			);
		}

		const passwordValid = await this.crypto.verifyPassword(body.password, user.passwordHash);
		if (!passwordValid) {
			await this.usersService.recordFailedLogin(
				user,
				this.config.maxLoginAttempts,
				this.config.loginLockMinutes,
			);
			throw invalidCredentialsException();
		}

		if (!user.isActive) {
			throw new UnauthorizedException({
				code: 'AUTH_ACCOUNT_INACTIVE',
				message: 'This account is inactive',
			});
		}
		if (!user.emailVerifiedAt) {
			throw new ForbiddenException({
				code: 'AUTH_EMAIL_NOT_VERIFIED',
				message: 'Verify your email before signing in',
			});
		}

		await this.usersService.resetFailedLogins(user.id);
		return this.createSession(user, metadata);
	}

	async refresh(refreshToken: string): Promise<AuthSessionResult> {
		const sessionId = this.crypto.getSessionIdFromRefreshToken(refreshToken);
		if (!sessionId) {
			throw invalidRefreshTokenException();
		}

		const session = await this.authRepository.findSessionById(sessionId);
		if (!isSessionActive(session)) {
			throw invalidRefreshTokenException();
		}

		if (!this.crypto.verifyRefreshToken(refreshToken, session.refreshTokenHash)) {
			await this.authRepository.revokeSession(session.id, session.userId, 'refresh_token_reuse');
			throw invalidRefreshTokenException();
		}

		const user = await this.usersService.findById(session.userId);
		if (!user?.isActive) {
			await this.authRepository.revokeSession(session.id, session.userId, 'user_inactive');
			throw invalidRefreshTokenException();
		}

		const nextRefreshToken = this.crypto.createRefreshToken(session.id);
		const expiresAt = this.getSessionExpiry();
		const rotated = await this.authRepository.rotateSession(
			session.id,
			session.refreshTokenHash,
			this.crypto.hashRefreshToken(nextRefreshToken),
			expiresAt,
		);
		if (!rotated) {
			throw invalidRefreshTokenException();
		}

		return this.buildSessionResult(user, rotated.id, nextRefreshToken);
	}

	async logout(refreshToken: string | null): Promise<void> {
		if (!refreshToken) {
			return;
		}
		const sessionId = this.crypto.getSessionIdFromRefreshToken(refreshToken);
		if (!sessionId) {
			return;
		}
		const session = await this.authRepository.findSessionById(sessionId);
		if (session && this.crypto.verifyRefreshToken(refreshToken, session.refreshTokenHash)) {
			await this.authRepository.revokeSession(session.id, session.userId, 'logout');
		}
	}

	async logoutAll(userId: string): Promise<void> {
		await this.authRepository.revokeAllSessions(userId, 'logout_all');
	}

	async me(userId: string): Promise<PublicUser> {
		return this.usersService.getCurrentUser(userId);
	}

	async forgotPassword(body: EmailBody): Promise<AuthChallengeResult> {
		const user = await this.usersService.findByEmail(body.email);
		if (!user?.isActive) {
			return acceptedChallenge('If an account exists, a password reset code has been sent.');
		}
		return this.issueChallenge(user, 'password_reset');
	}

	async resetPassword(body: ResetPasswordBody): Promise<AuthChallengeResult> {
		const user = await this.usersService.findByEmail(body.email);
		if (!user) {
			throw invalidOtpException();
		}
		const challenge = await this.validateChallenge(body.email, 'password_reset', body.code);
		const passwordHash = await this.crypto.hashPassword(body.newPassword);
		await this.authRepository.completePasswordReset({
			challengeId: challenge.id,
			userId: user.id,
			passwordHash,
		});
		return acceptedChallenge('Password reset successfully. Sign in with your new password.');
	}

	async changePassword(
		user: AccessTokenPayload,
		body: ChangePasswordBody,
	): Promise<AuthChallengeResult> {
		const record = await this.usersService.findById(user.sub);
		if (!record || !(await this.crypto.verifyPassword(body.currentPassword, record.passwordHash))) {
			throw new UnauthorizedException({
				code: 'AUTH_CURRENT_PASSWORD_INVALID',
				message: 'Current password is incorrect',
			});
		}
		const passwordHash = await this.crypto.hashPassword(body.newPassword);
		await this.authRepository.changePassword({
			userId: user.sub,
			currentSessionId: user.sid,
			passwordHash,
		});
		return acceptedChallenge('Password changed successfully. Other sessions were signed out.');
	}

	async authenticateAccessToken(token: string): Promise<AccessTokenPayload> {
		const payload = await this.crypto.verifyAccessToken(token);
		const session = await this.authRepository.findSessionById(payload.sid);
		if (!isSessionActive(session) || session.userId !== payload.sub) {
			throw new UnauthorizedException({
				code: 'AUTH_SESSION_INVALID',
				message: 'Session is no longer active',
			});
		}
		const user = await this.usersService.findById(payload.sub);
		if (!user?.isActive) {
			throw new UnauthorizedException({
				code: 'AUTH_SESSION_INVALID',
				message: 'Session is no longer active',
			});
		}
		return payload;
	}

	async listSessions(user: AccessTokenPayload): Promise<SessionView[]> {
		const sessions = await this.authRepository.listActiveSessions(user.sub);
		return sessions.map((session) => ({
			id: session.id,
			userAgent: session.userAgent,
			ipAddress: session.ipAddress,
			createdAt: session.createdAt.toISOString(),
			lastUsedAt: session.lastUsedAt.toISOString(),
			expiresAt: session.expiresAt.toISOString(),
			isCurrent: session.id === user.sid,
		}));
	}

	async revokeSession(user: AccessTokenPayload, sessionId: string): Promise<{ current: boolean }> {
		await this.authRepository.revokeSession(sessionId, user.sub, 'user_revoked');
		return { current: sessionId === user.sid };
	}

	toPublicSession(result: AuthSessionResult): PublicAuthSession {
		return {
			accessToken: result.accessToken,
			accessTokenExpiresAt: result.accessTokenExpiresAt,
			user: result.user,
		};
	}

	private async createSession(
		user: UserRecord,
		metadata: RequestMetadata,
	): Promise<AuthSessionResult> {
		const sessionId = randomUUID();
		const refreshToken = this.crypto.createRefreshToken(sessionId);
		await this.authRepository.createSession({
			id: sessionId,
			userId: user.id,
			refreshTokenHash: this.crypto.hashRefreshToken(refreshToken),
			expiresAt: this.getSessionExpiry(),
			metadata,
		});
		return this.buildSessionResult(user, sessionId, refreshToken);
	}

	private async buildSessionResult(
		user: UserRecord,
		sessionId: string,
		refreshToken: string,
	): Promise<AuthSessionResult> {
		const accessToken = await this.crypto.signAccessToken({ sub: user.id, sid: sessionId });
		return {
			accessToken: accessToken.token,
			accessTokenExpiresAt: accessToken.expiresAt.toISOString(),
			refreshToken,
			user: toPublicUser(user),
		};
	}

	private async issueChallenge(
		user: UserRecord,
		purpose: AuthChallengePurpose,
	): Promise<AuthChallengeResult> {
		const code = this.crypto.generateOtp();
		await this.authRepository.createChallenge({
			userId: user.id,
			email: user.email,
			purpose,
			codeHash: this.crypto.hashOtp(purpose, user.email, code),
			expiresAt: new Date(Date.now() + this.config.otpTtlMinutes * 60_000),
		});

		if (purpose === 'email_verification') {
			await this.email.sendVerificationCode(user.email, code);
		} else {
			await this.email.sendPasswordResetCode(user.email, code);
		}

		return {
			accepted: true,
			message:
				purpose === 'email_verification'
					? 'A verification code has been sent.'
					: 'If an account exists, a password reset code has been sent.',
			...(this.config.exposeAuthCodes ? { developmentCode: code } : {}),
		};
	}

	private async validateChallenge(
		email: string,
		purpose: AuthChallengePurpose,
		code: string,
	): Promise<AuthChallengeRecord> {
		const challenge = await this.authRepository.findLatestChallenge(email, purpose);
		if (
			!challenge ||
			challenge.expiresAt <= new Date() ||
			challenge.attempts >= this.config.otpMaxAttempts
		) {
			throw invalidOtpException();
		}

		if (!this.crypto.verifyOtp(purpose, email, code, challenge.codeHash)) {
			const attempts = challenge.attempts + 1;
			await this.authRepository.recordChallengeAttempt(
				challenge.id,
				attempts,
				attempts >= this.config.otpMaxAttempts,
			);
			throw invalidOtpException();
		}
		return challenge;
	}

	private getSessionExpiry(): Date {
		return new Date(Date.now() + this.config.sessionTtlDays * 86_400_000);
	}
}

function isSessionActive(session: SessionRecord | null): session is SessionRecord {
	return session !== null && session.revokedAt === null && session.expiresAt > new Date();
}

function acceptedChallenge(message: string): AuthChallengeResult {
	return { accepted: true, message };
}

function invalidCredentialsException(): UnauthorizedException {
	return new UnauthorizedException({
		code: 'AUTH_INVALID_CREDENTIALS',
		message: 'Invalid email or password',
	});
}

function invalidRefreshTokenException(): UnauthorizedException {
	return new UnauthorizedException({
		code: 'AUTH_REFRESH_TOKEN_INVALID',
		message: 'Session could not be refreshed',
	});
}

function invalidOtpException(): UnauthorizedException {
	return new UnauthorizedException({
		code: 'AUTH_OTP_INVALID',
		message: 'The code is invalid or expired',
	});
}
