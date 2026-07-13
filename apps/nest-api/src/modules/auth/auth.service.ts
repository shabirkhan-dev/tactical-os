import { randomUUID } from 'node:crypto';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { jwtVerify, SignJWT } from 'jose';

import { AppConfigService } from '../../config/app-config.service';
import type { AuthTokenPayload, AuthUser, AuthUserRecord, LoginResult } from './auth.types';
import type { LoginBody, RegisterBody } from './dto/auth.dto';

@Injectable()
export class AuthService {
	private readonly usersByEmail = new Map<string, AuthUserRecord>();
	private readonly usersById = new Map<string, AuthUserRecord>();

	constructor(private readonly config: AppConfigService) {}

	async register(body: RegisterBody): Promise<AuthUser> {
		if (this.usersByEmail.has(body.email)) {
			throw new ConflictException({
				code: 'EMAIL_ALREADY_REGISTERED',
				message: 'An account with this email already exists',
			});
		}

		const usernameTaken = [...this.usersByEmail.values()].some(
			(user) => user.username.toLowerCase() === body.username.toLowerCase(),
		);
		if (usernameTaken) {
			throw new ConflictException({
				code: 'USERNAME_TAKEN',
				message: 'This username is already taken',
			});
		}

		const record: AuthUserRecord = {
			id: randomUUID(),
			email: body.email,
			username: body.username,
			is_active: true,
			passwordHash: await hash(body.password, 10),
			createdAt: new Date().toISOString(),
		};

		this.usersByEmail.set(record.email, record);
		this.usersById.set(record.id, record);

		return this.toPublicUser(record);
	}

	async login(body: LoginBody): Promise<LoginResult> {
		const record = this.usersByEmail.get(body.email);
		if (!record || !(await compare(body.password, record.passwordHash))) {
			throw new UnauthorizedException({
				code: 'INVALID_CREDENTIALS',
				message: 'Invalid email or password',
			});
		}

		if (!record.is_active) {
			throw new UnauthorizedException({
				code: 'ACCOUNT_INACTIVE',
				message: 'This account is inactive',
			});
		}

		const user = this.toPublicUser(record);
		const access_token = await this.signToken({
			sub: user.id,
			email: user.email,
			username: user.username,
		});

		return {
			access_token,
			token_type: 'Bearer',
			user,
		};
	}

	async me(userId: string): Promise<AuthUser> {
		const record = this.usersById.get(userId);
		if (!record?.is_active) {
			throw new UnauthorizedException({
				code: 'UNAUTHORIZED',
				message: 'Authentication required',
			});
		}

		return this.toPublicUser(record);
	}

	async verifyAccessToken(token: string): Promise<AuthTokenPayload> {
		try {
			const { payload } = await jwtVerify(token, this.getJwtKey());
			const sub = typeof payload.sub === 'string' ? payload.sub : null;
			const email = typeof payload.email === 'string' ? payload.email : null;
			const username = typeof payload.username === 'string' ? payload.username : null;

			if (!sub || !email || !username) {
				throw new UnauthorizedException({
					code: 'INVALID_TOKEN',
					message: 'Invalid access token',
				});
			}

			return { sub, email, username };
		} catch {
			throw new UnauthorizedException({
				code: 'INVALID_TOKEN',
				message: 'Invalid or expired access token',
			});
		}
	}

	private async signToken(payload: AuthTokenPayload): Promise<string> {
		return new SignJWT({
			email: payload.email,
			username: payload.username,
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setSubject(payload.sub)
			.setIssuedAt()
			.setExpirationTime(this.config.jwtExpiresIn)
			.sign(this.getJwtKey());
	}

	private getJwtKey(): Uint8Array {
		return new TextEncoder().encode(this.config.jwtSecret);
	}

	private toPublicUser(record: AuthUserRecord): AuthUser {
		return {
			id: record.id,
			email: record.email,
			username: record.username,
			is_active: record.is_active,
		};
	}
}
