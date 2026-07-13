"use client";

import { cn } from "@/lib/utils";
import { StatCard, type Trend } from "./stat-card";

type Stat = {
	id: string;
	label: string;
	value: string;
	unit?: string;
	trend: Trend;
	trendDelta: string;
	trendLabel: string;
	bars: number[];
	activeIndex: number;
	activeColor?: string;
};

const stats: Stat[] = [
	{
		id: "revenue",
		label: "Total Revenue",
		value: "$20,320",
		trend: "up",
		trendDelta: "+0,94",
		trendLabel: "last year",
		bars: [55, 70, 45, 80, 100, 65, 50],
		activeIndex: 4,
		activeColor: "var(--dashboard-accent)",
	},
	{
		id: "orders",
		label: "Total Orders",
		value: "10,320",
		unit: "Orders",
		trend: "up",
		trendDelta: "+0,94",
		trendLabel: "last year",
		bars: [60, 50, 78, 64, 88, 70, 55],
		activeIndex: 4,
		activeColor: "var(--dashboard-accent)",
	},
	{
		id: "customers",
		label: "New Customers",
		value: "4,305",
		unit: "New Users",
		trend: "up",
		trendDelta: "+0,94",
		trendLabel: "last year",
		bars: [50, 65, 55, 92, 70, 60, 75],
		activeIndex: 3,
		activeColor: "var(--dashboard-accent)",
	},
	{
		id: "conversion",
		label: "Conversion Rate",
		value: "3.9%",
		trend: "up",
		trendDelta: "+0,94",
		trendLabel: "last year",
		bars: [70, 55, 80, 60, 95, 65, 50],
		activeIndex: 4,
		activeColor: "var(--dashboard-accent)",
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
				"grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-border sm:grid-cols-2 xl:grid-cols-4",
				className,
			)}
		>
			{stats.map((s) => (
				<StatCard
					key={s.id}
					label={s.label}
					value={s.value}
					unit={s.unit}
					trend={s.trend}
					trendDelta={s.trendDelta}
					trendLabel={s.trendLabel}
					bars={s.bars}
					activeIndex={s.activeIndex}
					activeColor={s.activeColor}
				/>
			))}
		</section>
	);
}
