import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { ComponentProps } from "react";

type HeaderIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
	icon: IconSvgElement;
};

export function HeaderHugeIcon({ icon, size = 16, strokeWidth = 1.5, ...props }: HeaderIconProps) {
	return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} {...props} />;
}
