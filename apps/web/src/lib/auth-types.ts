/** Shared auth types for Python, Rust, and Hono APIs. */

export type ApiKind = "python" | "rust" | "hono";

export interface User {
	id: number | string;
	email: string;
	username: string;
	is_active: boolean;
	enable2FA?: boolean;
}

export interface TokenResponse {
	access_token: string;
	token_type?: string;
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
