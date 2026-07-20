export function isDevAuthCodeEnabled(): boolean {
	return __DEV__;
}

function isValidDevCode(code: string | undefined): code is string {
	return typeof code === "string" && /^\d{6}$/.test(code);
}

/** Route params for dev OTP (never persisted client-side). */
export function devCodeRouteParams(devCode?: string): Record<string, string> {
	if (!isDevAuthCodeEnabled() || !isValidDevCode(devCode)) {
		return {};
	}
	return { devCode };
}

export function readDevCodeParam(value: string | string[] | undefined): string | null {
	if (!isDevAuthCodeEnabled()) {
		return null;
	}
	const code = typeof value === "string" ? value : undefined;
	return isValidDevCode(code) ? code : null;
}
