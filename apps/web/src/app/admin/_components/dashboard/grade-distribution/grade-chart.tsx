"use client";

import { cn } from "@/lib/utils";

const BAR_W = 4;
const CHART_H = 240;
const PAD_TOP = 14;
const LABEL_H = 26;

const COLOR_DOT = "var(--dashboard-chart-dot)";
const DOT_SIZE = 5;
const DASHED_BG =
	"repeating-linear-gradient(to right, var(--dashboard-chart-leader) 0 2px, transparent 2px 6px)";

type DrillType = { label: string; short: string; sessions: number };

const DRILL_TYPES: DrillType[] = [
	{ label: "CQB", short: "CQB", sessions: 412 },
	{ label: "Marksmanship", short: "MRK", sessions: 386 },
	{ label: "Physical", short: "PHY", sessions: 298 },
	{ label: "Qualification", short: "QLF", sessions: 264 },
	{ label: "Custom", short: "CST", sessions: 198 },
	{ label: "Dry fire", short: "DRY", sessions: 284 },
];

const MAX = Math.max(...DRILL_TYPES.map((d) => d.sessions));
const GRID_LEVELS = [0, 0.2, 0.4, 0.6, 0.8, 1];

type Props = {
	className?: string;
};

export function GradeChart({ className }: Props) {
	const inner = CHART_H - PAD_TOP - LABEL_H;

	return (
		<div className={cn("flex w-full flex-col", className)}>
			<div className="relative w-full" style={{ height: CHART_H }}>
				{GRID_LEVELS.map((g) => (
					<div
						key={g}
						className="absolute right-0 left-0 flex items-center"
						style={{
							top: PAD_TOP + inner * (1 - g) - DOT_SIZE / 2,
							height: DOT_SIZE,
						}}
					>
						<span
							aria-hidden
							className="shrink-0 rounded-full"
							style={{
								width: DOT_SIZE,
								height: DOT_SIZE,
								backgroundColor: COLOR_DOT,
							}}
						/>
						<span aria-hidden className="h-px flex-1" style={{ backgroundImage: DASHED_BG }} />
					</div>
				))}

				<div
					className="absolute inset-0 flex items-stretch justify-between px-3"
					style={{ paddingTop: PAD_TOP }}
				>
					{DRILL_TYPES.map((d) => (
						<div key={d.label} className="flex flex-col items-center justify-end">
							<span
								className="rounded-full bg-dashboard-accent transition-colors hover:bg-dashboard-accent-hover"
								style={{
									width: BAR_W,
									height: inner * (0.4 + 0.6 * (d.sessions / MAX)),
								}}
								title={`${d.label}: ${d.sessions} sessions`}
							/>
							<span className="mt-2 font-medium text-[10px] text-dashboard-text-dim">
								{d.short}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
