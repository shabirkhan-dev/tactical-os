import {
	AiLaptopIcon,
	CommandLineIcon,
	Globe02Icon,
	Rocket01Icon,
	Settings02Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

export const installCommand = "curl -fsSL https://alpaca.run/install.sh | sh";
export const launchCommand = "alpaca launch openclaw";

export type SetupStep = {
	label: string;
	icon: IconSvgElement;
};

export const setupSteps: SetupStep[] = [
	{ label: "alpaca launch openclaw", icon: CommandLineIcon },
	{ label: "installing openclaw...", icon: AiLaptopIcon },
	{ label: "configuring model...", icon: Settings02Icon },
	{ label: "adding web tools...", icon: Globe02Icon },
	{ label: "openclaw is running", icon: Rocket01Icon },
];

export const cloudReadyItems = [
	"Run larger models instantly",
	"Parallelize complex workflows",
	"Connect to live web data",
];
