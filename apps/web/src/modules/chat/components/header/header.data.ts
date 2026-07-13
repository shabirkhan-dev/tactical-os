import { ChatIcon, CodeSquareIcon, Leaf02Icon, SparklesIcon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

export type HeaderTab = {
	label: string;
	icon: IconSvgElement;
	active?: boolean;
};

export const headerTabs: HeaderTab[] = [
	{ label: "Chat", icon: SparklesIcon, active: true },
	{ label: "Agent", icon: ChatIcon },
	{ label: "Code", icon: CodeSquareIcon },
	{ label: "Design", icon: Leaf02Icon },
];
