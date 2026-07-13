import {
	DropboxIcon,
	FigmaIcon,
	GithubIcon,
	GoogleDriveIcon,
	GoogleIcon,
	Mail01Icon,
	NewTwitterIcon,
	Notion01Icon,
	PaintBoardIcon,
	SlackIcon,
	Task01Icon,
	TrelloIcon,
	ZoomIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { ComponentProps } from "react";

type BrandIconDefinition = {
	icon: IconSvgElement;
	color: string;
	strokeWidth?: number;
};

const appBrandMap = {
	x: { icon: NewTwitterIcon, color: "#27272a", strokeWidth: 1.85 },
	github: { icon: GithubIcon, color: "#24292f", strokeWidth: 1.75 },
	slack: { icon: SlackIcon, color: "#8a3ffc", strokeWidth: 1.75 },
	gmail: { icon: Mail01Icon, color: "#ea4335" },
	asana: { icon: Task01Icon, color: "#f06a6a" },
	zoom: { icon: ZoomIcon, color: "#2d8cff" },
	trello: { icon: TrelloIcon, color: "#0c66e4", strokeWidth: 1.75 },
	figma: { icon: FigmaIcon, color: "#a259ff", strokeWidth: 1.75 },
	notion: { icon: Notion01Icon, color: "#252525", strokeWidth: 1.75 },
	canva: { icon: PaintBoardIcon, color: "#00c4cc" },
	dropbox: { icon: DropboxIcon, color: "#0061ff", strokeWidth: 1.75 },
	drive: { icon: GoogleDriveIcon, color: "#0f9d58", strokeWidth: 1.75 },
	google: { icon: GoogleIcon, color: "#4285f4", strokeWidth: 1.75 },
} satisfies Record<string, BrandIconDefinition>;

export type AppBrandKey = keyof typeof appBrandMap;

type AppBrandIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
	brand: AppBrandKey;
};

export function AppBrandIcon({
	brand,
	size = 16,
	strokeWidth,
	style,
	...props
}: AppBrandIconProps) {
	const brandIcon = appBrandMap[brand];
	const resolvedStrokeWidth =
		strokeWidth ?? ("strokeWidth" in brandIcon ? brandIcon.strokeWidth : undefined) ?? 1.55;

	return (
		<HugeiconsIcon
			aria-hidden="true"
			icon={brandIcon.icon}
			size={size}
			strokeWidth={resolvedStrokeWidth}
			style={{ color: brandIcon.color, ...style }}
			{...props}
		/>
	);
}

export const connectApps = [
	{ id: "figma", label: "Figma", brand: "figma" },
	{ id: "drive", label: "Google Drive", brand: "drive" },
	{ id: "google", label: "Google", brand: "google" },
	{ id: "slack", label: "Slack", brand: "slack" },
	{ id: "github", label: "GitHub", brand: "github" },
] as const satisfies ReadonlyArray<{
	id: string;
	label: string;
	brand: AppBrandKey;
}>;
