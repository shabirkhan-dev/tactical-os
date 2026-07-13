import type { IconSvgElement } from "@hugeicons/react";

export type SidebarIcon = IconSvgElement;

export type SidebarItemData = {
	label: string;
	icon: SidebarIcon;
	badge?: string;
};
