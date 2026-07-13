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
				"relative min-h-[142px] bg-dashboard-card-inner p-4 transition-colors hover:bg-dashboard-surface-hover",
				className,
			)}
		>
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0">
					<div className="font-medium text-[11px] text-dashboard-text-muted uppercase">{label}</div>
					<div className="mt-4 flex items-baseline gap-2">
						<span className="font-semibold text-[26px] text-dashboard-text-primary leading-none tabular-nums">
							{value}
						</span>
						{unit && <span className="text-[12px] text-dashboard-text-muted">{unit}</span>}
					</div>
				</div>
				<MiniBars
					data={bars}
					activeIndex={activeIndex}
					activeColor={activeColor}
					className="mt-1 shrink-0"
				/>
			</div>

			<div className="mt-5 flex items-center gap-2 text-[12px] text-dashboard-text-muted tabular-nums">
				<span className="flex size-5 items-center justify-center rounded-md bg-dashboard-hover text-dashboard-text-muted">
					<HugeiconsIcon icon={ArrowUp01Icon} size={13} strokeWidth={2.2} />
				</span>
				<span className={cn("font-semibold", trendColor[trend])}>{trendDelta}</span>
				<span>{trendLabel}</span>
			</div>
		</div>
	);
}
