import { apiClient } from "@/lib/api/client";
import type { UpdateUserProfileInput, User } from "../types/user.types";

export const usersService = {
	getCurrent: (accessToken: string) => apiClient.get<User>("/users/me", { accessToken }),
	updateProfile: (accessToken: string, input: UpdateUserProfileInput) =>
		apiClient.patch<User>("/users/me/profile", input, { accessToken }),
};
