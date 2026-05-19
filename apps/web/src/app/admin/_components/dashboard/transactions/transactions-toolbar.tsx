"use client";

import { Add01Icon, MoreHorizontalIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

type Props = {
	className?: string;
	onAdd?: () => void;
};

export function TransactionsToolbar({ className, onAdd }: Props) {
	return (
		<div className={cn("flex items-center gap-2", className)}>
			<div className="group flex h-9 items-center gap-2 rounded-xl border border-dashboard-border-strong bg-dashboard-surface px-3 transition-colors focus-within:border-dashboard-border-focus hover:border-dashboard-border">
				<HugeiconsIcon
					icon={Search01Icon}
					size={15}
					strokeWidth={1.8}
					className="text-dashboard-text-muted transition-colors group-focus-within:text-dashboard-text-secondary"
				/>
				<input
					type="text"
					placeholder="Search transactions..."
					className="h-full w-[240px] bg-transparent text-[12.5px] text-dashboard-text-primary placeholder:text-dashboard-text-muted focus:outline-none"
				/>
			</div>

			<button
				type="button"
				onClick={onAdd}
				className="flex h-9 items-center gap-1.5 rounded-xl bg-[#FF6A1A] px-3.5 font-semibold text-[12.5px] text-white transition-all hover:bg-[#ff7a33] active:scale-[0.97]"
			>
				<HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2.4} />
				<span className="tracking-tight">Add Transaction</span>
			</button>

			<button
				type="button"
				aria-label="More"
				className="flex size-9 items-center justify-center rounded-full border border-dashboard-border-strong bg-dashboard-surface text-dashboard-text-muted transition-colors hover:border-dashboard-border-focus hover:text-dashboard-text-primary"
			>
				<HugeiconsIcon icon={MoreHorizontalIcon} size={15} strokeWidth={2} />
			</button>
		</div>
	);
}
