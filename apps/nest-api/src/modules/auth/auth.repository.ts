import { Injectable } from '@nestjs/common';

export type AuthUserRecord = {
	id: string;
	name: string;
	email: string;
	passwordHash: string;
	createdAt: Date;
	updatedAt: Date;
};

export type SessionRecord = {
	id: string;
	userId: string;
	userAgent: string | null;
	expiresAt: Date;
	createdAt: Date;
};

@Injectable()
export class AuthRepository {
	private readonly usersById = new Map<string, AuthUserRecord>();
	private readonly usersByEmail = new Map<string, AuthUserRecord>();
	private readonly sessionsById = new Map<string, SessionRecord>();

	findUserByEmail(email: string): AuthUserRecord | null {
		return this.usersByEmail.get(email.toLowerCase()) ?? null;
	}

	findUserById(userId: string): AuthUserRecord | null {
		return this.usersById.get(userId) ?? null;
	}

	createUser(user: AuthUserRecord): AuthUserRecord {
		const normalizedEmail = user.email.toLowerCase();
		this.usersById.set(user.id, user);
		this.usersByEmail.set(normalizedEmail, user);
		return user;
	}

	createSession(session: SessionRecord): SessionRecord {
		this.sessionsById.set(session.id, session);
		return session;
	}

	findSessionById(sessionId: string): SessionRecord | null {
		return this.sessionsById.get(sessionId) ?? null;
	}

	deleteSession(sessionId: string): void {
		this.sessionsById.delete(sessionId);
	}
}
