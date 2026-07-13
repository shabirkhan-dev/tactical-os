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
				"overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-card-inner",
				className,
			)}
			aria-label="Sales trend"
		>
			<div className="flex items-center justify-between border-dashboard-border border-b px-4 py-3">
				<div className="flex items-center gap-1.5">
					<h2 className="font-medium text-[11px] text-dashboard-text-muted uppercase">
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

			<div className="overflow-x-auto p-4 sm:p-5">
				<div className="mb-5 flex min-w-[560px] items-start justify-between gap-5">
					<div>
						<span className="text-[12px] text-dashboard-text-muted">Total revenue</span>
						<div className="mt-1 font-semibold text-[28px] text-dashboard-text-primary leading-none tabular-nums">
							$20,320
						</div>
					</div>
					<div className="flex items-center gap-5">
						<div className="flex items-center gap-4">
							<LegendDot color="var(--dashboard-chart-dot)" label="New user" />
							<LegendDot color="var(--dashboard-accent)" label="Existing user" />
						</div>
						<RangeToggle />
					</div>
				</div>

				<PixelGridChart highlightMonth="JUN" className="min-w-[560px]" />
			</div>
		</section>
	);
}
