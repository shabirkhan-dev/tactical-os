/** Shared auth types for the NestJS API. */

export interface User {
	id: string;
	email: string;
	username: string;
	is_active: boolean;
}

export interface TokenResponse {
	access_token: string;
	token_type?: string;
	user?: User;
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
