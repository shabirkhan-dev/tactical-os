"use client";

import { InformationCircleIcon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { LegendDot } from "./legend-dot";
import { PixelGridChart } from "./pixel-grid-chart";
import { RangeToggle } from "./range-toggle";

type Props = {
	className?: string;
};

export function SalesTrendCard({ className }: Props) {
	return (
		<section
			className={cn(
				"rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px] ",
				className,
			)}
			aria-label="Sales trend"
		>
			{/* Outer header band */}
			<div className="flex items-center justify-between px-2.5 py-2">
				<div className="flex items-center gap-1.5">
					<h2 className="font-medium text-[11px] text-dashboard-text-muted uppercase tracking-[0.16em]">
						Sales Trend
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
				<div className="mb-4 flex flex-wrap items-center gap-3">
					<div className="flex items-baseline gap-2">
						<span className="text-[12px] text-dashboard-text-muted">Total Revenue:</span>
						<span className="font-semibold text-[28px] text-dashboard-text-primary leading-none tracking-tight tabular-nums">
							$20,320
						</span>
					</div>
					<div className="flex flex-1 items-center justify-center gap-5">
						<LegendDot color="var(--dashboard-chart-dot)" label="New User" />
						<LegendDot color="#FF6A1A" label="Existing User" />
					</div>
					<RangeToggle />
				</div>

				<PixelGridChart highlightMonth="JUN" />
			</div>
		</section>
	);
}
