export type AuthUser = {
	id: string;
	email: string;
	username: string;
	is_active: boolean;
};

export type AuthUserRecord = AuthUser & {
	passwordHash: string;
	createdAt: string;
};

export type AuthTokenPayload = {
	sub: string;
	email: string;
	username: string;
};

export type LoginResult = {
	access_token: string;
	token_type: 'Bearer';
	user: AuthUser;
};
