import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import type { ComponentProps } from "react";

type MarketplaceIconProps = Omit<ComponentProps<typeof HugeiconsIcon>, "icon"> & {
	icon: IconSvgElement;
};

export function MarketplaceHugeIcon({
	icon,
	size = 16,
	strokeWidth = 1.5,
	...props
}: MarketplaceIconProps) {
	return <HugeiconsIcon icon={icon} size={size} strokeWidth={strokeWidth} {...props} />;
}
