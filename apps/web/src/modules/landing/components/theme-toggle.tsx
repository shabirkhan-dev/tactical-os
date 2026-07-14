"use client";

import { Moon, Sun } from "lucide-react";
import type { AtlasTheme } from "../lib/theme";
import { cn } from "../lib/utils";

type ThemeToggleProps = {
	theme: AtlasTheme;
	onToggle: () => void;
	className?: string;
};

export function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
	const isDark = theme === "dark";

	return (
		<button
			type="button"
			onClick={onToggle}
			aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
			className={cn(
				"inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 bg-background/60 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
				className,
			)}
		>
			{isDark ? (
				<Sun className="h-4 w-4" strokeWidth={1.75} />
			) : (
				<Moon className="h-4 w-4" strokeWidth={1.75} />
			)}
		</button>
	);
}
