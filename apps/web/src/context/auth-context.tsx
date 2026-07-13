"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import * as api from "@/lib/api-client";
import type {
	AuthSession,
	LoginRequest,
	RegisterRequest,
	RegistrationResult,
	User,
} from "@/lib/auth-types";

interface AuthState {
	token: string | null;
	user: User | null;
	loading: boolean;
	error: string | null;
}

interface AuthContextValue extends AuthState {
	login: (payload: LoginRequest) => Promise<void>;
	register: (payload: RegisterRequest) => Promise<RegistrationResult>;
	logout: () => Promise<void>;
	logoutAll: () => Promise<void>;
	refreshUser: () => Promise<void>;
	clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [tokenExpiresAt, setTokenExpiresAt] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const clearSession = useCallback(() => {
		setToken(null);
		setTokenExpiresAt(null);
		setUser(null);
	}, []);

	const applySession = useCallback((session: AuthSession) => {
		setToken(session.accessToken);
		setTokenExpiresAt(session.accessTokenExpiresAt);
		setUser(session.user);
	}, []);

	const refreshSession = useCallback(async () => {
		const session = await api.refreshSession();
		applySession(session);
		return session;
	}, [applySession]);

	useEffect(() => {
		refreshSession()
			.catch(clearSession)
			.finally(() => setLoading(false));
	}, [clearSession, refreshSession]);

	useEffect(() => {
		if (!tokenExpiresAt) {
			return;
		}
		const delay = Math.max(1_000, new Date(tokenExpiresAt).getTime() - Date.now() - 60_000);
		const timer = window.setTimeout(() => {
			refreshSession().catch(clearSession);
		}, delay);
		return () => window.clearTimeout(timer);
	}, [clearSession, refreshSession, tokenExpiresAt]);

	const login = useCallback(
		async (payload: LoginRequest) => {
			setError(null);
			try {
				applySession(await api.login(payload));
			} catch (caught) {
				setError(toErrorMessage(caught, "Login failed"));
				throw caught;
			}
		},
		[applySession],
	);

	const register = useCallback(async (payload: RegisterRequest) => {
		setError(null);
		try {
			return await api.register(payload);
		} catch (caught) {
			setError(toErrorMessage(caught, "Registration failed"));
			throw caught;
		}
	}, []);

	const logout = useCallback(async () => {
		try {
			await api.logout();
		} finally {
			clearSession();
		}
	}, [clearSession]);

	const logoutAll = useCallback(async () => {
		try {
			if (token) {
				await api.logoutAll(token);
			}
		} finally {
			clearSession();
		}
	}, [clearSession, token]);

	const refreshUser = useCallback(async () => {
		if (!token) {
			return;
		}
		try {
			setUser(await api.me(token));
		} catch (caught) {
			if (caught instanceof api.ApiError && caught.statusCode === 401) {
				await refreshSession();
				return;
			}
			throw caught;
		}
	}, [refreshSession, token]);

	return (
		<AuthContext.Provider
			value={{
				token,
				user,
				loading,
				error,
				login,
				register,
				logout,
				logoutAll,
				refreshUser,
				clearError: () => setError(null),
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextValue {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return context;
}

function toErrorMessage(error: unknown, fallback: string): string {
	return error instanceof Error ? error.message : fallback;
}
