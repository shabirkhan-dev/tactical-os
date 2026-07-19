"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import {
	applyThemeClass,
	DEFAULT_THEME,
	type ResolvedTheme,
	readStoredTheme,
	THEME_STORAGE_KEY,
	type Theme,
} from "./theme";

type ThemeContextValue = {
	theme: Theme;
	resolvedTheme: ResolvedTheme;
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);
	const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>("dark");

	const setTheme = useCallback((next: Theme) => {
		setThemeState(next);
		try {
			window.localStorage.setItem(THEME_STORAGE_KEY, next);
		} catch {
			// ignore quota / private mode
		}
		setResolvedTheme(applyThemeClass(next));
	}, []);

	useEffect(() => {
		const initial = readStoredTheme();
		setThemeState(initial);
		setResolvedTheme(applyThemeClass(initial));

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => {
			setThemeState((current) => {
				if (current === "system") {
					setResolvedTheme(applyThemeClass("system"));
				}
				return current;
			});
		};
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, []);

	const value = useMemo<ThemeContextValue>(
		() => ({
			theme,
			resolvedTheme,
			setTheme,
		}),
		[theme, resolvedTheme, setTheme],
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error("useTheme must be used within ThemeProvider");
	}
	return ctx;
}
