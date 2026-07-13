"use client";

import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";
import * as api from "@/lib/api-client";
import type { LoginRequest, RegisterRequest, User } from "@/lib/auth-types";

const STORAGE_TOKEN = "school-os-auth-token";

interface AuthState {
	token: string | null;
	user: User | null;
	loading: boolean;
	error: string | null;
}

interface AuthContextValue extends AuthState {
	login: (payload: LoginRequest) => Promise<void>;
	register: (payload: RegisterRequest) => Promise<void>;
	logout: () => void;
	refreshUser: () => Promise<void>;
	clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function loadStoredToken(): string | null {
	if (typeof window === "undefined") {
		return null;
	}
	return localStorage.getItem(STORAGE_TOKEN);
}

export function AuthProvider({ children }: { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const logout = useCallback(() => {
		setToken(null);
		setUser(null);
		if (typeof window !== "undefined") {
			localStorage.removeItem(STORAGE_TOKEN);
		}
	}, []);

	const fetchUser = useCallback(async (accessToken: string) => {
		const nextUser = await api.me(accessToken);
		setUser(nextUser);
	}, []);

	const refreshUser = useCallback(async () => {
		if (!token) {
			return;
		}
		await fetchUser(token);
	}, [fetchUser, token]);

	useEffect(() => {
		const storedToken = loadStoredToken();
		setToken(storedToken);
		if (!storedToken) {
			setLoading(false);
			return;
		}

		api
			.me(storedToken)
			.then((nextUser) => setUser(nextUser))
			.catch(() => {
				if (typeof window !== "undefined") {
					localStorage.removeItem(STORAGE_TOKEN);
				}
				setToken(null);
			})
			.finally(() => setLoading(false));
	}, []);

	const login = useCallback(
		async (payload: LoginRequest) => {
			setError(null);
			try {
				const res = await api.login(payload);
				const accessToken = res.access_token;
				setToken(accessToken);
				if (typeof window !== "undefined") {
					localStorage.setItem(STORAGE_TOKEN, accessToken);
				}
				if (res.user) {
					setUser(res.user);
				} else {
					await fetchUser(accessToken);
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : "Login failed");
				throw err;
			}
		},
		[fetchUser],
	);

	const register = useCallback(
		async (payload: RegisterRequest) => {
			setError(null);
			try {
				await api.register(payload);
				await login({ email: payload.email, password: payload.password });
			} catch (err) {
				setError(err instanceof Error ? err.message : "Registration failed");
				throw err;
			}
		},
		[login],
	);

	const value: AuthContextValue = {
		token,
		user,
		loading,
		error,
		login,
		register,
		logout,
		refreshUser,
		clearError: () => setError(null),
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within AuthProvider");
	}
	return ctx;
}
