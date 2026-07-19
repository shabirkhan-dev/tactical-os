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
		id: "open",
		label: "Open tasks",
		value: "18",
		hint: "6 due today · attendance + fees",
	},
	{
		id: "alerts",
		label: "Campus alerts",
		value: "3",
		hint: "2 low · 1 needs review",
	},
	{
		id: "sync",
		label: "Last sync",
		value: "2m ago",
		hint: "SIS · attendance · billing",
	},
	{
		id: "staff",
		label: "On campus",
		value: "186/214",
		hint: "Staff checked in this morning",
	},
];

type Props = {
	className?: string;
};

/**
 * Quiet operational depth under the greeting — same idea as chat's
 * title + description + status line, without adding another card.
 */
export function OpsPulseStrip({ className }: Props) {
	return (
		<section
			aria-label="Operational pulse"
			className={cn(
				"grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-dashboard-border bg-dashboard-border sm:grid-cols-4",
				className,
			)}
		>
			{PULSE.map((item) => (
				<div
					key={item.id}
					className="bg-dashboard-card-inner px-3.5 py-3 transition-colors hover:bg-dashboard-surface-hover"
				>
					<div className="font-medium text-[10.5px] text-dashboard-text-muted uppercase tracking-[0.06em]">
						{item.label}
					</div>
					<div className="mt-1.5 font-semibold text-[18px] text-dashboard-text-primary leading-none tracking-tight tabular-nums">
						{item.value}
					</div>
					<p className="mt-1.5 truncate text-[11.5px] text-dashboard-text-dim leading-4">
						{item.hint}
					</p>
				</div>
			))}
		</section>
	);
}
