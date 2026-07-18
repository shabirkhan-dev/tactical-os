import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../context/auth-context";
import { authService } from "../services/auth.service";
import { assertPasskeysAvailable } from "../services/passkey-native";
import type { LoginInput, TwoFactorInput } from "../types/auth.types";

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

export function usePasskeyLoginMutation() {
	const { establishSession } = useAuth();
	return useMutation({
		mutationFn: async (email?: string) => {
			const Passkey = await assertPasskeysAvailable();
			const ceremony = await authService.beginPasskeyLogin(email);
			const response = await Passkey.get(
				ceremony.options as unknown as Parameters<typeof Passkey.get>[0],
			);
			if (!response) {
				throw new Error("Passkey sign-in was cancelled");
			}
			const session = await authService.finishPasskeyLogin({
				challengeId: ceremony.challengeId,
				response: response as unknown as Record<string, unknown>,
			});
			await establishSession(session);
			return session;
		},
	});
}
