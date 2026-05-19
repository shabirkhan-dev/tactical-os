"use client";

import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@/context/auth-context";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const { user, loading } = useAuth();

	if (loading) {
		return (
			<div className="flex min-h-svh items-center justify-center">
				<p className="text-muted-foreground">Loading…</p>
			</div>
		);
	}
	if (!user) {
		router.replace("/login");
		return null;
	}
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col">
					<div className="@container/main flex flex-1 flex-col gap-2">{children}</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
