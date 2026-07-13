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
		<div className={cn("flex w-full items-center gap-2 sm:w-auto", className)}>
			<div className="group flex h-9 min-w-0 flex-1 items-center gap-2 rounded-lg border border-dashboard-border bg-dashboard-surface px-3 transition-colors focus-within:border-dashboard-border-focus hover:border-dashboard-border-strong sm:flex-none">
				<HugeiconsIcon
					icon={Search01Icon}
					size={15}
					strokeWidth={1.8}
					className="text-dashboard-text-muted transition-colors group-focus-within:text-dashboard-text-secondary"
				/>
				<input
					type="text"
					placeholder="Search transactions..."
					className="h-full min-w-0 flex-1 bg-transparent text-[12.5px] text-dashboard-text-primary placeholder:text-dashboard-text-muted focus:outline-none sm:w-[240px] sm:flex-none"
				/>
			</div>

			<button
				type="button"
				onClick={onAdd}
				className="flex h-9 items-center gap-1.5 rounded-lg bg-dashboard-accent px-3.5 font-semibold text-[12.5px] text-white transition-all hover:bg-dashboard-accent-hover active:scale-[0.97]"
			>
				<HugeiconsIcon icon={Add01Icon} size={14} strokeWidth={2.4} />
				<span className="hidden sm:inline">Add Transaction</span>
				<span className="sr-only sm:hidden">Add transaction</span>
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
