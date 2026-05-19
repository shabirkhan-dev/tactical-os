"use client";

import { AiMagicIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

type Props = {
	label?: string;
	onClick?: () => void;
	className?: string;
};

export function AiInsightButton({
	label = "Get AI insight for better analysis",
	onClick,
	className,
}: Props) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"group flex w-full items-center gap-3 rounded-xl border border-dashboard-border-strong bg-dashboard-card-inner px-2 py-2 text-left transition-all hover:border-dashboard-border-focus hover:bg-dashboard-surface-hover",
				className,
			)}
		>
			<span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-dashboard-border-strong bg-dashboard-surface-elevated text-[#FF6A1A]">
				<HugeiconsIcon icon={AiMagicIcon} size={16} strokeWidth={1.8} />
			</span>
			<span className="flex-1 truncate text-[13px] text-dashboard-text-secondary">{label}</span>
			<span className="flex size-7 shrink-0 items-center justify-center rounded-full text-dashboard-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-dashboard-text-primary">
				<HugeiconsIcon icon={ArrowRight01Icon} size={15} strokeWidth={2} />
			</span>
		</button>
	);
}
