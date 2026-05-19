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
				"flex h-9 items-center gap-1.5 rounded-xl bg-[#FF6A1A] px-3.5 font-semibold text-[13px] text-white transition-all hover:bg-[#ff7a33] active:scale-[0.97]",
				className,
			)}
		>
			<HugeiconsIcon icon={Add01Icon} size={15} strokeWidth={2.4} />
			<span className="tracking-tight">{label}</span>
		</button>
	);
}
