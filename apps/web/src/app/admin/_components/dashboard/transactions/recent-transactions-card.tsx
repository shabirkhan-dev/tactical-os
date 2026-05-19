"use client";

import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { TransactionsTable } from "./transactions-table";
import { TransactionsToolbar } from "./transactions-toolbar";

type Props = {
	className?: string;
};

export function RecentTransactionsCard({ className }: Props) {
	return (
		<section
			className={cn(
				"rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px] ",
				className,
			)}
			aria-label="Recent transactions"
		>
			{/* Outer header band */}
			<div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2">
				<div className="flex items-center gap-1.5">
					<h2 className="font-medium text-[11px] text-dashboard-text-muted uppercase tracking-[0.16em]">
						Recent Transactions
					</h2>
					<HugeiconsIcon
						icon={InformationCircleIcon}
						size={13}
						strokeWidth={1.8}
						className="text-dashboard-text-faint"
					/>
				</div>
				<TransactionsToolbar />
			</div>

			{/* Inner card with table */}
			<div className="rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner ">
				<TransactionsTable />
			</div>
		</section>
	);
}
