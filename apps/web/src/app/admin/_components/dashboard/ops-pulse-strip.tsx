"use client";

import { cn } from "@/lib/utils";

type PulseItem = {
	id: string;
	label: string;
	value: string;
	hint: string;
};

const PULSE: PulseItem[] = [
	{
		id: "sessions",
		label: "Sessions today",
		value: "24",
		hint: "6 CQB · 8 marksmanship · 4 physical",
	},
	{
		id: "review",
		label: "Needs review",
		value: "2",
		hint: "Instructor sign-off queue",
	},
	{
		id: "sync",
		label: "Offline queue",
		value: "3",
		hint: "Pending background sync",
	},
	{
		id: "operators",
		label: "On range",
		value: "18/22",
		hint: "Alpha + Bravo checked in",
	},
];

type Props = {
	className?: string;
};

export function OpsPulseStrip({ className }: Props) {
	return (
		<section
			aria-label="Operational pulse"
			className={cn(
				"grid grid-cols-2 gap-px overflow-hidden border border-dashboard-border bg-dashboard-border sm:grid-cols-4",
				className,
			)}
		>
			{PULSE.map((item) => (
				<div
					key={item.id}
					className="bg-dashboard-surface px-3 py-2.5 transition-colors hover:bg-dashboard-surface-hover sm:px-3.5 sm:py-3"
				>
					<div className="font-mono text-[10px] text-dashboard-text-muted uppercase tracking-widest">
						{item.label}
					</div>
					<div className="mt-1.5 font-semibold text-[17px] text-dashboard-text-primary leading-none tracking-tight tabular-nums sm:text-[18px]">
						{item.value}
					</div>
					<p className="mt-1.5 line-clamp-2 text-[11px] text-dashboard-text-dim leading-4">
						{item.hint}
					</p>
				</div>
			))}
		</section>
	);
}
