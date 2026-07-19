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
		id: "students",
		label: "Total Students",
		value: 2847,
		formatValue: whole,
		detail: "Across 3 campuses · 253 seats still open",
		trend: "up",
		trendDelta: "+4.2%",
		trendLabel: "vs last term",
		bars: [55, 70, 45, 80, 100, 65, 78],
		activeIndex: 4,
	},
	{
		id: "attendance",
		label: "Attendance Rate",
		value: 94.6,
		formatValue: percent,
		detail: "Dip driven by G9–G10 absences Mon–Tue",
		trend: "down",
		trendDelta: "-0.8%",
		trendLabel: "vs last week",
		bars: [60, 50, 78, 64, 88, 70, 55],
		activeIndex: 4,
	},
	{
		id: "staff",
		label: "Teaching Staff",
		value: 214,
		formatValue: whole,
		detail: "186 checked in · 4 on leave today",
		trend: "up",
		trendDelta: "+6",
		trendLabel: "vs last term",
		bars: [50, 65, 55, 92, 70, 60, 75],
		activeIndex: 3,
	},
	{
		id: "fees",
		label: "Fee Collection",
		value: 87.3,
		formatValue: percent,
		detail: "$412k outstanding · 61 families past due",
		trend: "up",
		trendDelta: "+1.5%",
		trendLabel: "vs last month",
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
