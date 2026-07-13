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
				"overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-card-inner",
				className,
			)}
			aria-label="Recent transactions"
		>
			<div className="flex flex-wrap items-center justify-between gap-3 border-dashboard-border border-b px-4 py-3">
				<div className="flex items-center gap-1.5">
					<h2 className="font-medium text-[11px] text-dashboard-text-muted uppercase">
						Recent Transactions
					</h2>
					<HugeiconsIcon
						icon={InformationCircleIcon}
						size={13}
						strokeWidth={1.8}
						className="text-dashboard-text-faint"
					/>
				</div>
				<TransactionsToolbar className="basis-full sm:basis-auto" />
			</div>

			<div>
				<TransactionsTable />
			</div>
		</section>
	);
}
