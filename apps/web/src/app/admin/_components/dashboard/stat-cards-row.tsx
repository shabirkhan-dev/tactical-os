"use client";

import { cn } from "@/lib/utils";
import { StatCard, type Trend } from "./stat-card";

type Stat = {
	id: string;
	label: string;
	value: number;
	formatValue: (n: number) => string;
	detail: string;
	trend: Trend;
	trendDelta: string;
	trendLabel: string;
	bars: number[];
	activeIndex: number;
};

const whole = (n: number) => Math.round(n).toLocaleString("en-US");
const percent = (n: number) => `${n.toFixed(1)}%`;

const stats: Stat[] = [
	{
		id: "operators",
		label: "Active Operators",
		value: 142,
		formatValue: whole,
		detail: "Alpha + Bravo cohorts · 8 on remedial track",
		trend: "up",
		trendDelta: "+6",
		trendLabel: "vs last month",
		bars: [55, 70, 45, 80, 100, 65, 78],
		activeIndex: 4,
	},
	{
		id: "qual-rate",
		label: "Qualification Rate",
		value: 87.4,
		formatValue: percent,
		detail: "CQB + marksmanship combined · 2 below threshold",
		trend: "up",
		trendDelta: "+3.1%",
		trendLabel: "vs last cycle",
		bars: [60, 50, 78, 64, 88, 70, 55],
		activeIndex: 4,
	},
	{
		id: "sessions",
		label: "Sessions This Week",
		value: 186,
		formatValue: whole,
		detail: "124 live · 62 logged offline · 3 pending sync",
		trend: "up",
		trendDelta: "+14",
		trendLabel: "vs prior week",
		bars: [50, 65, 55, 92, 70, 60, 75],
		activeIndex: 3,
	},
	{
		id: "review",
		label: "Instructor Review",
		value: 92.1,
		formatValue: percent,
		detail: "2 sessions awaiting sign-off · avg turnaround 4h",
		trend: "down",
		trendDelta: "-1.2%",
		trendLabel: "vs last week",
		bars: [70, 55, 80, 60, 95, 65, 50],
		activeIndex: 4,
	},
];

type Props = {
	className?: string;
};

export function StatCardsRow({ className }: Props) {
	return (
		<section
			aria-label="Key performance metrics"
			className={cn(
				"grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-border shadow-(--dashboard-shadow-card) sm:grid-cols-2 xl:grid-cols-4",
				className,
			)}
		>
			{stats.map((s) => (
				<StatCard
					key={s.id}
					label={s.label}
					value={s.value}
					formatValue={s.formatValue}
					detail={s.detail}
					trend={s.trend}
					trendDelta={s.trendDelta}
					trendLabel={s.trendLabel}
					bars={s.bars}
					activeIndex={s.activeIndex}
				/>
			))}
		</section>
	);
}
