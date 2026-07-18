import type { User } from "@/modules/users/types/user.types";

export interface AuthSession {
	accessToken: string;
	accessTokenExpiresAt: string;
	/** Present for native clients (SecureStore); omitted for cookie-based web clients. */
	refreshToken?: string;
	user: User;
}

export interface TwoFactorChallenge {
	requiresTwoFactor: true;
	challengeToken: string;
	expiresAt: string;
	methods: Array<"totp" | "recovery_code">;
}

export type LoginResult = AuthSession | TwoFactorChallenge;

export interface AuthChallengeResult {
	accepted: true;
	message: string;
	developmentCode?: string;
	developmentToken?: string;
}

export interface RegistrationResult extends AuthChallengeResult {
	user: User;
}

export interface LoginInput {
	email: string;
	password: string;
}

export interface RegisterInput {
	email: string;
	username: string;
	password: string;
}

export interface VerifyEmailInput {
	email: string;
	code: string;
}

export interface ResetPasswordInput {
	email: string;
	code: string;
	newPassword: string;
}

export interface TwoFactorInput {
	challengeToken: string;
	code: string;
}

export interface PasskeyAuthenticationOptions {
	challengeId: string;
	options: Record<string, unknown>;
}

export type AuthenticationResponseJSON = Record<string, unknown>;
