"use client";

import {
	Analytics01Icon,
	Camera01Icon,
	ChartHistogramIcon,
	CommandIcon,
	DashboardSquare01Icon,
	Database01Icon,
	File01Icon,
	Folder01Icon,
	HelpCircleIcon,
	Menu01Icon,
	SearchIcon,
	Settings05Icon,
	UserGroupIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@school-os/ui/components/sidebar";
import Link from "next/link";
import type * as React from "react";
import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { useAuth } from "@/context/auth-context";

const data = {
	navMain: [
		{
			title: "Dashboard",
			url: "#",
			icon: <HugeiconsIcon icon={DashboardSquare01Icon} strokeWidth={2} />,
		},
		{
			title: "Lifecycle",
			url: "#",
			icon: <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} />,
		},
		{
			title: "Analytics",
			url: "#",
			icon: <HugeiconsIcon icon={ChartHistogramIcon} strokeWidth={2} />,
		},
		{
			title: "Projects",
			url: "#",
			icon: <HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />,
		},
		{
			title: "Team",
			url: "#",
			icon: <HugeiconsIcon icon={UserGroupIcon} strokeWidth={2} />,
		},
	],
	navClouds: [
		{
			title: "Capture",
			icon: <HugeiconsIcon icon={Camera01Icon} strokeWidth={2} />,
			isActive: true,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Proposal",
			icon: <HugeiconsIcon icon={File01Icon} strokeWidth={2} />,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
		{
			title: "Prompts",
			icon: <HugeiconsIcon icon={File01Icon} strokeWidth={2} />,
			url: "#",
			items: [
				{
					title: "Active Proposals",
					url: "#",
				},
				{
					title: "Archived",
					url: "#",
				},
			],
		},
	],
	navSecondary: [
		{
			title: "Settings",
			url: "/dashboard/settings",
			icon: <HugeiconsIcon icon={Settings05Icon} strokeWidth={2} />,
		},
		{
			title: "Get Help",
			url: "#",
			icon: <HugeiconsIcon icon={HelpCircleIcon} strokeWidth={2} />,
		},
		{
			title: "Search",
			url: "#",
			icon: <HugeiconsIcon icon={SearchIcon} strokeWidth={2} />,
		},
	],
	documents: [
		{
			name: "Data Library",
			url: "#",
			icon: <HugeiconsIcon icon={Database01Icon} strokeWidth={2} />,
		},
		{
			name: "Reports",
			url: "#",
			icon: <HugeiconsIcon icon={Analytics01Icon} strokeWidth={2} />,
		},
		{
			name: "Word Assistant",
			url: "#",
			icon: <HugeiconsIcon icon={File01Icon} strokeWidth={2} />,
		},
	],
};
function initials(username: string): string {
	const parts = username.trim().split(/\s+/);
	if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
	return username.slice(0, 2).toUpperCase() || "?";
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user } = useAuth();
	const userForNav =
		user &&
		({
			name: user.username,
			email: user.email,
			avatar: "",
			initials: initials(user.username),
		} as const);

	return (
		<Sidebar collapsible="offcanvas" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							className="data-[slot=sidebar-menu-button]:p-1.5!"
							render={<Link href="/dashboard" />}
						>
							<HugeiconsIcon icon={CommandIcon} strokeWidth={2} className="size-5!" />
							<span className="text-base font-semibold">Acme Inc.</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<NavMain items={data.navMain} />
				<NavDocuments items={data.documents} />
				<NavSecondary items={data.navSecondary} className="mt-auto" />
			</SidebarContent>
			<SidebarFooter>{userForNav ? <NavUser user={userForNav} /> : null}</SidebarFooter>
		</Sidebar>
	);
}
