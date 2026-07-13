"use client";

import {
	Delete02Icon,
	Folder01Icon,
	MoreHorizontalCircle01Icon,
	Share01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@school-os/ui/components/dropdown-menu";
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@school-os/ui/components/sidebar";

export function NavDocuments({
	items,
}: {
	items: {
		name: string;
		url: string;
		icon: React.ReactNode;
	}[];
}) {
	const { isMobile } = useSidebar();
	return (
		<SidebarGroup className="group-data-[collapsible=icon]:hidden">
			<SidebarGroupLabel>Documents</SidebarGroupLabel>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.name}>
						<SidebarMenuButton
							// biome-ignore lint/a11y/useAnchorContent: content from SidebarMenuButton children (icon + span)
							render={<a href={item.url} aria-label={item.name} />}
						>
							{item.icon}
							<span>{item.name}</span>
						</SidebarMenuButton>
						<DropdownMenu>
							<DropdownMenuTrigger
								render={<SidebarMenuAction showOnHover className="aria-expanded:bg-muted" />}
							>
								<HugeiconsIcon icon={MoreHorizontalCircle01Icon} strokeWidth={2} />
								<span className="sr-only">More</span>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								className="w-24"
								side={isMobile ? "bottom" : "right"}
								align={isMobile ? "end" : "start"}
							>
								<DropdownMenuItem>
									<HugeiconsIcon icon={Folder01Icon} strokeWidth={2} />
									<span>Open</span>
								</DropdownMenuItem>
								<DropdownMenuItem>
									<HugeiconsIcon icon={Share01Icon} strokeWidth={2} />
									<span>Share</span>
								</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem variant="destructive">
									<HugeiconsIcon icon={Delete02Icon} strokeWidth={2} />
									<span>Delete</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				))}
				<SidebarMenuItem>
					<SidebarMenuButton className="text-sidebar-foreground/70">
						<HugeiconsIcon
							icon={MoreHorizontalCircle01Icon}
							strokeWidth={2}
							className="text-sidebar-foreground/70"
						/>
						<span>More</span>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarGroup>
	);
}
