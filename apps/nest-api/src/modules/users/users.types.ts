import type { UserRecord } from '../../database/schema';

export type PublicUser = {
	id: string;
	email: string;
	username: string;
	isActive: boolean;
	emailVerified: boolean;
	createdAt: string;
};

export function toPublicUser(user: UserRecord): PublicUser {
	return {
		id: user.id,
		email: user.email,
		username: user.username,
		isActive: user.isActive,
		emailVerified: user.emailVerifiedAt !== null,
		createdAt: user.createdAt.toISOString(),
	};
}
