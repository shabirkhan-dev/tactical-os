import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { ComponentProps } from "react";

type WelcomeIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
	icon: IconSvgElement;
};

export function WelcomeHugeIcon({
	icon,
	size = 16,
	strokeWidth = 1.5,
	...props
}: WelcomeIconProps) {
	return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} {...props} />;
}
