"use client";

import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

type Props = {
	label?: string;
	onClick?: () => void;
	className?: string;
};

export function ExportButton({ label = "Export CSV", onClick, className }: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"flex h-9 items-center gap-1.5 rounded-lg bg-dashboard-accent px-3 font-semibold text-[12.5px] text-dashboard-accent-fg transition-all hover:bg-dashboard-accent-hover active:scale-[0.97] sm:px-3.5 sm:text-[13px]",
				className,
			)}
		>
			<HugeiconsIcon icon={Add01Icon} size={15} strokeWidth={2.4} />
			<span className="sm:hidden">Export</span>
			<span className="hidden sm:inline">{label}</span>
		</button>
	);
}
