"use client";

import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";
import { authQueryKeys } from "../queries/auth-query-keys";
import { authService } from "../services/auth.service";
import type { ChangePasswordInput, LoginInput, TwoFactorInput } from "../types/auth.types";

export function useLoginMutation() {
	const auth = useAuth();
	return useMutation({ mutationFn: (input: LoginInput) => auth.login(input) });
}

export function useTwoFactorMutation() {
	const auth = useAuth();
	return useMutation({ mutationFn: (input: TwoFactorInput) => auth.verifyTwoFactor(input) });
}

export function useMagicLinkRequestMutation() {
	return useMutation({ mutationFn: (email: string) => authService.requestMagicLink(email) });
}

export function useMagicLinkConsumeMutation() {
	const { consumeMagicLink } = useAuth();
	return useMutation({ mutationFn: (token: string) => consumeMagicLink(token) });
}

export function useGoogleLoginMutation() {
	const { googleLogin } = useAuth();
	return useMutation({ mutationFn: (credential: string) => googleLogin(credential) });
}

export function usePasskeyLoginMutation() {
	const { establishSession } = useAuth();
	return useMutation({
		mutationFn: async (email: string) => {
			const ceremony = await authService.beginPasskeyLogin(email);
			const response = await startAuthentication({ optionsJSON: ceremony.options });
			const session = await authService.finishPasskeyLogin({
				email,
				challengeId: ceremony.challengeId,
				response,
			});
			establishSession(session);
			return session;
		},
	});
}

export function useChangePasswordMutation() {
	const { token } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input: ChangePasswordInput) =>
			authService.changePassword(requireToken(token), input),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: authQueryKeys.all }),
	});
}

export function useRevokeSessionMutation() {
	const { token, user } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (sessionId: string) => authService.revokeSession(requireToken(token), sessionId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: authQueryKeys.sessions(user?.id) }),
	});
}

export function useBeginTotpSetupMutation() {
	const { token } = useAuth();
	return useMutation({ mutationFn: () => authService.beginTotpSetup(requireToken(token)) });
}

export function useConfirmTotpSetupMutation() {
	const { token, user } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (code: string) => authService.confirmTotpSetup(requireToken(token), code),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: authQueryKeys.security(user?.id) }),
	});
}

export function useDisableTotpMutation() {
	const { token, user } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (code: string) => authService.disableTotp(requireToken(token), code),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: authQueryKeys.security(user?.id) }),
	});
}

export function useRegisterPasskeyMutation() {
	const { token, user } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (name: string) => {
			const accessToken = requireToken(token);
			const ceremony = await authService.beginPasskeyRegistration(accessToken);
			const response = await startRegistration({ optionsJSON: ceremony.options });
			return authService.finishPasskeyRegistration(accessToken, {
				challengeId: ceremony.challengeId,
				name,
				response,
			});
		},
		onSuccess: () => queryClient.invalidateQueries({ queryKey: authQueryKeys.security(user?.id) }),
	});
}

export function useDeletePasskeyMutation() {
	const { token, user } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (passkeyId: string) => authService.deletePasskey(requireToken(token), passkeyId),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: authQueryKeys.security(user?.id) }),
	});
}

export function useLinkGoogleMutation() {
	const { token, user } = useAuth();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (credential: string) => authService.linkGoogle(requireToken(token), credential),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: authQueryKeys.security(user?.id) }),
	});
}

function requireToken(token: string | null): string {
	if (!token) throw new Error("Authentication required");
	return token;
}
