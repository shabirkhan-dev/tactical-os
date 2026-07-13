"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";
import { authQueryKeys } from "../queries/auth-query-keys";
import { authService } from "../services/auth.service";

export function useAuthProvidersQuery() {
	return useQuery({ queryKey: authQueryKeys.providers(), queryFn: authService.providers });
}

export function useSessionsQuery() {
	const { token, user } = useAuth();
	return useQuery({
		queryKey: authQueryKeys.sessions(user?.id),
		queryFn: () => authService.listSessions(requireToken(token)),
		enabled: Boolean(token && user),
	});
}

export function useSecurityStatusQuery() {
	const { token, user } = useAuth();
	return useQuery({
		queryKey: authQueryKeys.security(user?.id),
		queryFn: () => authService.securityStatus(requireToken(token)),
		enabled: Boolean(token && user),
	});
}

function requireToken(token: string | null): string {
	if (!token) throw new Error("Authentication required");
	return token;
}
