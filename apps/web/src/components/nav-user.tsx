"use client";

import {
	CreditCardIcon,
	Logout01Icon,
	MoreVerticalCircle01Icon,
	Notification03Icon,
	UserCircle02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Avatar, AvatarFallback, AvatarImage } from "@school-os/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@school-os/ui/components/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@school-os/ui/components/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export function NavUser({
	user,
}: {
	user: {
		name: string;
		email: string;
		avatar?: string;
		initials?: string;
	};
}) {
	const { isMobile } = useSidebar();
	const router = useRouter();
	const { logout } = useAuth();
	const fallback = user.initials ?? (user.name.slice(0, 2).toUpperCase() || "?");

	async function handleLogout() {
		await logout();
		router.push("/login");
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={<SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />}
					>
						<Avatar className="size-8 rounded-lg grayscale">
							{user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
							<AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-start text-sm leading-tight">
							<span className="truncate font-medium">{user.name}</span>
							<span className="text-foreground/70 truncate text-xs">{user.email}</span>
						</div>
						<HugeiconsIcon
							icon={MoreVerticalCircle01Icon}
							strokeWidth={2}
							className="ms-auto size-4"
						/>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="min-w-56"
						side={isMobile ? "bottom" : "right"}
						align="end"
						sideOffset={4}
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-start text-sm">
									<Avatar className="size-8">
										{user.avatar ? <AvatarImage src={user.avatar} alt={user.name} /> : null}
										<AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-start text-sm leading-tight">
										<span className="truncate font-medium">{user.name}</span>
										<span className="text-muted-foreground truncate text-xs">{user.email}</span>
									</div>
								</div>
							</DropdownMenuLabel>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem render={<Link href="/admin/account/profile" />}>
								<HugeiconsIcon icon={UserCircle02Icon} strokeWidth={2} />
								Profile
							</DropdownMenuItem>
							<DropdownMenuItem>
								<HugeiconsIcon icon={CreditCardIcon} strokeWidth={2} />
								Billing
							</DropdownMenuItem>
							<DropdownMenuItem>
								<HugeiconsIcon icon={Notification03Icon} strokeWidth={2} />
								Notifications
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => void handleLogout()}>
							<HugeiconsIcon icon={Logout01Icon} strokeWidth={2} />
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
}
