import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { ComponentProps } from "react";

type SidebarHugeIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
	icon: IconSvgElement;
};

export function SidebarHugeIcon({
	icon,
	size = 16,
	strokeWidth = 1.5,
	...props
}: SidebarHugeIconProps) {
	return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} {...props} />;
}
