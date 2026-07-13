export interface User {
	id: string;
	email: string;
	username: string;
	isActive: boolean;
	emailVerified: boolean;
	createdAt: string;
}

export interface AuthSession {
	accessToken: string;
	accessTokenExpiresAt: string;
	user: User;
}

export interface AuthChallengeResult {
	accepted: true;
	message: string;
	developmentCode?: string;
}

export interface RegistrationResult extends AuthChallengeResult {
	user: User;
}

export interface SessionInfo {
	id: string;
	userAgent: string | null;
	ipAddress: string | null;
	createdAt: string;
	lastUsedAt: string;
	expiresAt: string;
	isCurrent: boolean;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface RegisterRequest {
	email: string;
	username: string;
	password: string;
}

export interface VerifyEmailRequest {
	email: string;
	code: string;
}

export interface ResetPasswordRequest {
	email: string;
	code: string;
	newPassword: string;
}

export interface ChangePasswordRequest {
	currentPassword: string;
	newPassword: string;
}
