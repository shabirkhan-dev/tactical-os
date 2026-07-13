import {
	Add01Icon,
	Folder01Icon,
	GridViewIcon,
	Home01Icon,
	Layers02Icon,
} from "@hugeicons/core-free-icons";
import type { SidebarItemData } from "@/modules/chat/components/sidebar/sidebar.types";

export const primarySidebarItems: SidebarItemData[] = [
	{ label: "Welcome", icon: Home01Icon },
	{ label: "New chat", icon: Add01Icon },
	{ label: "Projects", icon: Folder01Icon },
	{ label: "Artifacts", icon: Layers02Icon },
	{ label: "Apps", icon: GridViewIcon, badge: "New" },
];

export const projectSidebarItems = [
	"Growth Campaign",
	"Content Engine",
	"Automation Flow",
	"User Research",
];

export const recentSidebarItems = [
	"Fix spacing on cards",
	"Need better empty state",
	"Update sidebar structure",
	"Mobile nav feels cramped",
	"Can we simplify this?",
	"Generate onboarding copy",
	"Improve search results",
	"Settings page feedback",
];
