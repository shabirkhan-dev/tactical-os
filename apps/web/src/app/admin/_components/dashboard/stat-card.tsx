"use client";

import { ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { MiniBars } from "./mini-bars";

export type Trend = "up" | "down" | "flat";

type Props = {
	label: string;
	value: string;
	unit?: string;
	trendLabel?: string;
	trendDelta?: string;
	trend?: Trend;
	bars: number[];
	activeIndex?: number;
	activeColor?: string;
	className?: string;
};

const trendColor: Record<Trend, string> = {
	up: "text-emerald-400",
	down: "text-rose-400",
	flat: "text-dashboard-text-muted",
};

export function StatCard({
	label,
	value,
	unit,
	trendLabel = "last year",
	trendDelta = "+0,94",
	trend = "up",
	bars,
	activeIndex,
	activeColor,
	className,
}: Props) {
	return (
		<div
			className={cn(
				// outer card: blends with body, holds inner card + footer row
				"rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px] ",
				className,
			)}
		>
			{/* Inner elevated card */}
			<div className="relative rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner px-4 pt-4 pb-5 ">
				<div className="flex items-start justify-between gap-3">
					<div className="min-w-0 space-y-3">
						<div className="font-medium text-[11px] text-dashboard-text-muted uppercase tracking-[0.16em]">
							{label}
						</div>
						<div className="flex items-baseline gap-2">
							<span className="font-semibold text-[28px] text-dashboard-text-primary leading-none tracking-tight tabular-nums">
								{value}
							</span>
							{unit && <span className="text-[13px] text-dashboard-text-muted">{unit}</span>}
						</div>
					</div>
					<MiniBars
						data={bars}
						activeIndex={activeIndex}
						activeColor={activeColor}
						className="shrink-0 self-end"
					/>
				</div>
			</div>

			{/* Footer row in outer card */}
			<div className="flex items-center justify-between px-3 pt-2 pb-1">
				<button
					type="button"
					aria-label="Trend up"
					className="flex size-6 items-center justify-center rounded-md bg-dashboard-hover text-dashboard-text-muted transition-colors hover:bg-dashboard-hover-strong hover:text-dashboard-text-primary"
				>
					<HugeiconsIcon icon={ArrowUp01Icon} size={13} strokeWidth={2.2} />
				</button>
				<div className="text-[12px] text-dashboard-text-muted tabular-nums">
					<span className={cn("font-semibold", trendColor[trend])}>{trendDelta}</span> {trendLabel}
				</div>
			</div>
		</div>
	);
}
