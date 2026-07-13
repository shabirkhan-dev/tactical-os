"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/context/auth-context";
import { userQueryKeys } from "../queries/user-query-keys";
import { usersService } from "../services/users.service";

export function useCurrentUserQuery() {
	const { token, user } = useAuth();
	return useQuery({
		queryKey: userQueryKeys.current(),
		queryFn: () => usersService.getCurrent(requireToken(token)),
		initialData: user ?? undefined,
		enabled: Boolean(token),
	});
}

function requireToken(token: string | null): string {
	if (!token) throw new Error("Authentication required");
	return token;
}
