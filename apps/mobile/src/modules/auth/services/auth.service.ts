import { apiClient } from "@/lib/api/client";
import type { User } from "@/modules/users/types/user.types";
import type {
	AuthChallengeResult,
	AuthenticationResponseJSON,
	AuthSession,
	LoginInput,
	LoginResult,
	PasskeyAuthenticationOptions,
	RegisterInput,
	RegistrationResult,
	ResetPasswordInput,
	TwoFactorInput,
	VerifyEmailInput,
} from "../types/auth.types";
import { tokenStorage } from "./token-storage";

export const authService = {
	register: (input: RegisterInput) => apiClient.post<RegistrationResult>("/auth/register", input),
	verifyEmail: (input: VerifyEmailInput) => apiClient.post<User>("/auth/verify-email", input),
	resendVerification: (email: string) =>
		apiClient.post<AuthChallengeResult>("/auth/resend-verification", { email }),
	login: (input: LoginInput) => apiClient.post<LoginResult>("/auth/login", input),
	verifyTwoFactor: (input: TwoFactorInput) =>
		apiClient.post<AuthSession>("/auth/methods/two-factor/verify", input),
	refresh: async () => {
		const refreshToken = await tokenStorage.getRefreshToken();
		if (!refreshToken) {
			throw new Error("No refresh token");
		}
		return apiClient.post<AuthSession>("/auth/refresh", { refreshToken });
	},
	logout: async () => {
		const refreshToken = await tokenStorage.getRefreshToken();
		await apiClient.post<void>("/auth/logout", refreshToken ? { refreshToken } : {});
	},
	logoutAll: (accessToken: string) =>
		apiClient.post<void>("/auth/logout-all", undefined, { accessToken }),
	forgotPassword: (email: string) =>
		apiClient.post<AuthChallengeResult>("/auth/forgot-password", { email }),
	resetPassword: (input: ResetPasswordInput) =>
		apiClient.post<AuthChallengeResult>("/auth/reset-password", input),
	requestMagicLink: (email: string) =>
		apiClient.post<AuthChallengeResult>("/auth/methods/magic-link/request", { email }),
	consumeMagicLink: (token: string) =>
		apiClient.post<AuthSession>("/auth/methods/magic-link/consume", { token }),
	beginPasskeyLogin: (email?: string) =>
		apiClient.post<PasskeyAuthenticationOptions>(
			"/auth/methods/passkeys/options",
			email ? { email } : {},
		),
	finishPasskeyLogin: (input: { challengeId: string; response: AuthenticationResponseJSON }) =>
		apiClient.post<AuthSession>("/auth/methods/passkeys/verify", input),
	me: (accessToken: string) => apiClient.get<User>("/auth/me", { accessToken }),
};
