import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/modules/auth";
import { updateUserProfileSchema } from "../schemas/user.schemas";
import { usersService } from "../services/users.service";
import type { UpdateUserProfileInput } from "../types/user.types";

export function useUpdateUserProfileMutation() {
	const { token, refreshUser } = useAuth();
	return useMutation({
		mutationFn: (input: UpdateUserProfileInput) =>
			usersService.updateProfile(requireToken(token), updateUserProfileSchema.parse(input)),
		onSuccess: async () => {
			await refreshUser();
		},
	});
}

export function useUploadAvatarMutation() {
	const { token, refreshUser } = useAuth();
	return useMutation({
		mutationFn: (file: { uri: string; name: string; type: string }) =>
			usersService.uploadAvatar(requireToken(token), file),
		onSuccess: async () => {
			await refreshUser();
		},
	});
}

function requireToken(token: string | null): string {
	if (!token) throw new Error("Authentication required");
	return token;
}
