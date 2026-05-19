import { randomUUID } from 'node:crypto';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import type { Request } from 'express';
import {
	ACCESS_TOKEN_EXPIRES_IN_SECONDS,
	JWT_ACCESS_SECRET,
	JWT_REFRESH_SECRET,
	REFRESH_TOKEN_EXPIRES_IN_SECONDS,
} from './auth.constants';
import { AuthRepository } from './auth.repository';
import type { LoginDto } from './dto/login.dto';
import type { RefreshTokenDto } from './dto/refresh-token.dto';
import type { RegisterDto } from './dto/register.dto';

type AccessPayload = {
	userId: string;
	sessionId: string;
	email: string;
};

type RefreshPayload = {
	sessionId: string;
};

type SafeUser = {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
};

@Injectable()
export class AuthService {
	constructor(
		private readonly repository: AuthRepository,
		private readonly jwtService: JwtService,
	) {}

	async register(input: RegisterDto): Promise<{ message: string; data: { user: SafeUser } }> {
		const existingUser = this.repository.findUserByEmail(input.email);
		if (existingUser) {
			throw new BadRequestException('User already exists with this email');
		}

		const now = new Date();
		const user = this.repository.createUser({
			id: randomUUID(),
			name: input.name.trim(),
			email: input.email.trim().toLowerCase(),
			passwordHash: await hash(input.password, 10),
			createdAt: now,
			updatedAt: now,
		});

		return {
			message: 'User registered successfully',
			data: {
				user: this.toSafeUser(user),
			},
		};
	}

	async login(
		input: LoginDto,
		request: Request,
	): Promise<{
		message: string;
		data: {
			user: SafeUser;
			accessToken: string;
			refreshToken: string;
		};
	}> {
		const user = this.repository.findUserByEmail(input.email);
		if (!user) {
			throw new UnauthorizedException('Invalid email or password');
		}

		const validPassword = await compare(input.password, user.passwordHash);
		if (!validPassword) {
			throw new UnauthorizedException('Invalid email or password');
		}

		const sessionId = randomUUID();
		const session = this.repository.createSession({
			id: sessionId,
			userId: user.id,
			userAgent: request.headers['user-agent'] ?? null,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
			createdAt: new Date(),
		});

		const accessToken = await this.signAccessToken({
			userId: user.id,
			sessionId: session.id,
			email: user.email,
		});
		const refreshToken = await this.signRefreshToken({
			sessionId: session.id,
		});

		return {
			message: 'Login successful',
			data: {
				user: this.toSafeUser(user),
				accessToken,
				refreshToken,
			},
		};
	}

	async refreshToken(input: RefreshTokenDto): Promise<{
		message: string;
		data: { accessToken: string; refreshToken: string };
	}> {
		let payload: RefreshPayload;
		try {
			payload = await this.jwtService.verifyAsync<RefreshPayload>(input.refreshToken, {
				secret: JWT_REFRESH_SECRET,
			});
		} catch {
			throw new UnauthorizedException('Invalid refresh token');
		}

		const session = this.repository.findSessionById(payload.sessionId);
		if (!session || session.expiresAt.getTime() <= Date.now()) {
			throw new UnauthorizedException('Invalid refresh token');
		}

		const user = this.repository.findUserById(session.userId);
		if (!user) {
			throw new UnauthorizedException('Invalid refresh token');
		}

		const accessToken = await this.signAccessToken({
			userId: user.id,
			sessionId: session.id,
			email: user.email,
		});
		const refreshToken = await this.signRefreshToken({ sessionId: session.id });

		return {
			message: 'Token refreshed successfully',
			data: { accessToken, refreshToken },
		};
	}

	async me(userId: string): Promise<{ message: string; data: { user: SafeUser } }> {
		const user = this.repository.findUserById(userId);
		if (!user) {
			throw new UnauthorizedException('User not found');
		}

		return {
			message: 'OK',
			data: { user: this.toSafeUser(user) },
		};
	}

	async logout(sessionId: string): Promise<{ message: string }> {
		this.repository.deleteSession(sessionId);
		return {
			message: 'Logged out successfully',
		};
	}

	async verifyAccessToken(token: string): Promise<AccessPayload> {
		let payload: AccessPayload;
		try {
			payload = await this.jwtService.verifyAsync<AccessPayload>(token, {
				secret: JWT_ACCESS_SECRET,
			});
		} catch {
			throw new UnauthorizedException('Invalid or expired token');
		}
		const session = this.repository.findSessionById(payload.sessionId);
		if (!session || session.expiresAt.getTime() <= Date.now()) {
			throw new UnauthorizedException('Invalid or expired token');
		}
		return payload;
	}

	private async signAccessToken(payload: AccessPayload): Promise<string> {
		return this.jwtService.signAsync(payload, {
			secret: JWT_ACCESS_SECRET,
			expiresIn: ACCESS_TOKEN_EXPIRES_IN_SECONDS,
		});
	}

	private async signRefreshToken(payload: RefreshPayload): Promise<string> {
		return this.jwtService.signAsync(payload, {
			secret: JWT_REFRESH_SECRET,
			expiresIn: REFRESH_TOKEN_EXPIRES_IN_SECONDS,
		});
	}

	private toSafeUser(user: {
		id: string;
		name: string;
		email: string;
		createdAt: Date;
		updatedAt: Date;
	}): SafeUser {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		};
	}
}
