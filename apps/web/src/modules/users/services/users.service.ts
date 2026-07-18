import { apiClient } from "@/lib/api/client";
import type { UpdateUserProfileInput, User } from "../types/user.types";

export const usersService = {
	getCurrent: (accessToken: string) => apiClient.get<User>("/users/me", { accessToken }),
	updateProfile: (accessToken: string, input: UpdateUserProfileInput) =>
		apiClient.patch<User>("/users/me/profile", input, { accessToken }),
	uploadAvatar: (accessToken: string, file: File) => {
		const body = new FormData();
		body.append("file", file);
		return apiClient.postForm<User>("/users/me/avatar", body, { accessToken });
	},
};
