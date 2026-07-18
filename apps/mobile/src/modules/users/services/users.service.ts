import { apiClient } from "@/lib/api/client";
import type { UpdateUserProfileInput, User } from "../types/user.types";

export const usersService = {
	getCurrent: (accessToken: string) => apiClient.get<User>("/users/me", { accessToken }),
	updateProfile: (accessToken: string, input: UpdateUserProfileInput) =>
		apiClient.patch<User>("/users/me/profile", input, { accessToken }),
	uploadAvatar: (accessToken: string, file: { uri: string; name: string; type: string }) => {
		const body = new FormData();
		body.append("file", file as unknown as Blob);
		return apiClient.postForm<User>("/users/me/avatar", body, { accessToken });
	},
};
