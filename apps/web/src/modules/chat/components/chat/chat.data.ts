import { Globe02Icon, PlusSignIcon, SearchFocusIcon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

export type ChatQuickAction = {
	label: string;
	description: string;
	icon: IconSvgElement;
};

export const chatQuickActions: ChatQuickAction[] = [
	{ label: "Create", description: "Tasks, Images, Docs", icon: PlusSignIcon },
	{ label: "Find", description: "Answers & Files", icon: SearchFocusIcon },
	{ label: "Research", description: "Apps & Web", icon: Globe02Icon },
];
