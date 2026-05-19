"use client";

import { InformationCircleIcon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { AiInsightButton } from "./ai-insight-button";
import { BreakdownChart } from "./breakdown-chart";
import { DateRangePill } from "./date-range-pill";

type Props = {
	className?: string;
};

export function RevenueBreakdownCard({ className }: Props) {
	return (
		<section
			className={cn(
				"rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px] ",
				className,
			)}
			aria-label="Revenue breakdown"
		>
			{/* Outer header band */}
			<div className="flex items-center justify-between px-2.5 py-2">
				<div className="flex items-center gap-1.5">
					<h2 className="font-medium text-[11px] text-dashboard-text-muted uppercase tracking-[0.16em]">
						Revenue Breakdown
					</h2>
					<HugeiconsIcon
						icon={InformationCircleIcon}
						size={13}
						strokeWidth={1.8}
						className="text-dashboard-text-faint"
					/>
				</div>
				<button
					type="button"
					aria-label="More"
					className="flex size-7 items-center justify-center rounded-full border border-dashboard-border-strong bg-dashboard-surface text-dashboard-text-muted transition-colors hover:border-dashboard-border-focus hover:text-dashboard-text-primary"
				>
					<HugeiconsIcon icon={MoreHorizontalIcon} size={14} strokeWidth={2} />
				</button>
			</div>

			{/* Inner card */}
			<div className="rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner p-4 ">
				{/* Top row: title + value | date pill */}
				<div className="mb-3 flex items-start justify-between gap-3">
					<div className="space-y-1">
						<div className="text-[12.5px] text-dashboard-text-muted">Revenue by Category</div>
						<div className="font-semibold text-[28px] text-dashboard-text-primary leading-none tracking-tight tabular-nums">
							$20,320
						</div>
					</div>
					<DateRangePill label="Jan 1 - Aug 30" />
				</div>

				{/* AI insight CTA */}
				<AiInsightButton className="mb-4" />

				{/* Chart */}
				<BreakdownChart />
			</div>
		</section>
	);
}
