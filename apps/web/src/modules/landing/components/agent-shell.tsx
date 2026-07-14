"use client";

import type { ReactNode } from "react";
import { SITE } from "../data/landing.data";
import { useAtlasTheme } from "../lib/theme";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { ThemeToggle } from "./theme-toggle";

type AgentShellProps = {
	children: ReactNode;
};

export function AgentShell({ children }: AgentShellProps) {
	const { theme, toggleTheme } = useAtlasTheme();

	return (
		<div data-landing className="relative min-h-screen bg-background text-foreground antialiased">
			<SiteHeader />
			<main>{children}</main>
			<SiteFooter />

			<div className="border-t border-border/60 px-4">
				<div className="mx-auto flex w-full max-w-6xl items-center justify-between py-5">
					<p className="text-xs text-muted-foreground">© 2026 {SITE.name}. Always on.</p>
					<ThemeToggle theme={theme} onToggle={toggleTheme} />
				</div>
			</div>
		</div>
	);
}
