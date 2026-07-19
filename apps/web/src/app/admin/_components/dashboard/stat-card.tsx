"use client";

import { ArrowDown01Icon, ArrowRight01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { MiniBars } from "./mini-bars";
import { useCountUp } from "./use-count-up";

export type Trend = "up" | "down" | "flat";

type Props = {
	label: string;
	value: number;
	formatValue: (n: number) => string;
	detail?: string;
	trendLabel?: string;
	trendDelta?: string;
	trend?: Trend;
	bars: number[];
	activeIndex?: number;
	className?: string;
};

const trendSpec: Record<Trend, { icon: typeof ArrowUp01Icon; chip: string; delta: string }> = {
	up: {
		icon: ArrowUp01Icon,
		chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
		delta: "text-emerald-600 dark:text-emerald-400",
	},
	down: {
		icon: ArrowDown01Icon,
		chip: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
		delta: "text-rose-600 dark:text-rose-400",
	},
	flat: {
		icon: ArrowRight01Icon,
		chip: "bg-dashboard-hover text-dashboard-text-muted",
		delta: "text-dashboard-text-muted",
	},
};

export function StatCard({
	label,
	value,
	formatValue,
	detail,
	trendLabel = "vs last term",
	trendDelta = "+0.0%",
	trend = "up",
	bars,
	activeIndex,
	className,
}: Props) {
	const animated = useCountUp(value);
	const spec = trendSpec[trend];

	return (
		<div
			className={cn(
				"relative min-h-[158px] bg-dashboard-card-inner p-4 transition-colors duration-200 hover:bg-dashboard-surface-hover",
				className,
			)}
		>
			<div className="flex items-start justify-between gap-4">
				<div className="min-w-0">
					<div className="font-medium text-[11px] text-dashboard-text-muted uppercase tracking-[0.06em]">
						{label}
					</div>
					<div className="mt-3 flex items-baseline gap-2">
						<span className="font-semibold text-[26px] text-dashboard-text-primary leading-none tracking-tight tabular-nums">
							{formatValue(animated)}
						</span>
					</div>
					{detail ? (
						<p className="mt-2 max-w-[180px] text-[12px] text-dashboard-text-dim leading-4">
							{detail}
						</p>
					) : null}
				</div>
				<MiniBars data={bars} activeIndex={activeIndex} className="mt-1 shrink-0" />
			</div>

			<div className="mt-4 flex items-center gap-2 text-[12px] text-dashboard-text-muted tabular-nums">
				<span className={cn("flex size-5 items-center justify-center rounded-md", spec.chip)}>
					<HugeiconsIcon icon={spec.icon} size={13} strokeWidth={2.2} />
				</span>
				<span className={cn("font-semibold", spec.delta)}>{trendDelta}</span>
				<span>{trendLabel}</span>
			</div>
		</div>
	);
}
