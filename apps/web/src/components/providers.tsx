"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";
import { AuthProvider } from "@/context/auth-context";
import { QueryProvider } from "./providers/query-provider";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
			<QueryProvider>
				<AuthProvider>{children}</AuthProvider>
			</QueryProvider>
		</ThemeProvider>
	);
}
