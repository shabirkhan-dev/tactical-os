export interface UserProfile {
	displayName: string | null;
	avatarUrl: string | null;
	bio: string | null;
	timezone: string | null;
	locale: string | null;
}

export interface User {
	id: string;
	email: string;
	username: string;
	isActive: boolean;
	emailVerified: boolean;
	hasPassword: boolean;
	createdAt: string;
	profile?: UserProfile;
}

export interface UpdateUserProfileInput {
	username?: string;
	displayName?: string | null;
	avatarUrl?: string | null;
	bio?: string | null;
	timezone?: string | null;
	locale?: string | null;
}
