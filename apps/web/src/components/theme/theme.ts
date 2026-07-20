export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";
export const DEFAULT_THEME: Theme = "dark";

export function getSystemTheme(): ResolvedTheme {
	if (typeof window === "undefined") {
		return "dark";
	}
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function resolveTheme(theme: Theme): ResolvedTheme {
	return theme === "system" ? getSystemTheme() : theme;
}

export function readStoredTheme(): Theme {
	if (typeof window === "undefined") {
		return DEFAULT_THEME;
	}
	try {
		const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === "light" || stored === "dark" || stored === "system") {
			return stored;
		}
	} catch {
		// ignore quota / private mode
	}
	return DEFAULT_THEME;
}

export function applyThemeClass(theme: Theme): ResolvedTheme {
	const resolved = resolveTheme(theme);
	const root = document.documentElement;
	root.classList.toggle("dark", resolved === "dark");
	root.style.colorScheme = resolved;
	return resolved;
}

/** Inline script: runs before paint to avoid a light/dark flash. Keys are compile-time constants. */
export const themeInitScript =
	'(function(){try{var k="theme";var d="dark";var t=localStorage.getItem(k)||d;var dark=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var r=document.documentElement;r.classList.toggle("dark",dark);r.style.colorScheme=dark?"dark":"light";}catch(e){}})();';
