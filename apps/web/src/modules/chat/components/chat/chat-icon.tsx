import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { ComponentProps } from "react";

type ChatIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
	icon: IconSvgElement;
};

export function ChatHugeIcon({ icon, size = 16, strokeWidth = 1.5, ...props }: ChatIconProps) {
	return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} {...props} />;
}
