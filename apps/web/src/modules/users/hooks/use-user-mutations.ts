"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth/context/auth-context";
import { userQueryKeys } from "../queries/user-query-keys";
import { updateUserProfileSchema } from "../schemas/user.schemas";
import { usersService } from "../services/users.service";
import type { UpdateUserProfileInput } from "../types/user.types";

export function useUpdateUserProfileMutation() {
	const { token, refreshUser } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input: UpdateUserProfileInput) =>
			usersService.updateProfile(requireToken(token), updateUserProfileSchema.parse(input)),
		onSuccess: async (user) => {
			queryClient.setQueryData(userQueryKeys.current(), user);
			await refreshUser();
		},
	});
}

export function useUploadAvatarMutation() {
	const { token, refreshUser } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (file: File) => usersService.uploadAvatar(requireToken(token), file),
		onSuccess: async (user) => {
			queryClient.setQueryData(userQueryKeys.current(), user);
			await refreshUser();
		},
	});
}

function requireToken(token: string | null): string {
	if (!token) throw new Error("Authentication required");
	return token;
}
