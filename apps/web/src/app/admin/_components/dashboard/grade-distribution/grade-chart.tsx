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

type Grade = { grade: number; students: number };

const GRADES: Grade[] = [
	{ grade: 1, students: 266 },
	{ grade: 2, students: 258 },
	{ grade: 3, students: 272 },
	{ grade: 4, students: 252 },
	{ grade: 5, students: 240 },
	{ grade: 6, students: 234 },
	{ grade: 7, students: 250 },
	{ grade: 8, students: 244 },
	{ grade: 9, students: 224 },
	{ grade: 10, students: 212 },
	{ grade: 11, students: 200 },
	{ grade: 12, students: 195 },
];

const MAX = Math.max(...GRADES.map((g) => g.students));
const GRID_LEVELS = [0, 0.2, 0.4, 0.6, 0.8, 1];

type Props = {
	className?: string;
};

export function GradeChart({ className }: Props) {
	const inner = CHART_H - PAD_TOP - LABEL_H;

	return (
		<div className={cn("flex w-full flex-col", className)}>
			<div className="relative w-full" style={{ height: CHART_H }}>
				{/* horizontal grid lines: left dot + dotted leader only */}
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

				{/* bars with grade labels */}
				<div
					className="absolute inset-0 flex items-stretch justify-between px-3"
					style={{ paddingTop: PAD_TOP }}
				>
					{GRADES.map((g) => (
						<div key={g.grade} className="flex flex-col items-center justify-end">
							<span
								className="rounded-full bg-dashboard-accent transition-colors hover:bg-dashboard-accent-hover"
								style={{
									width: BAR_W,
									height: inner * (0.4 + 0.6 * (g.students / MAX)),
								}}
								title={`Grade ${g.grade}: ${g.students} students`}
							/>
							<span className="mt-2 font-medium text-[10px] text-dashboard-text-dim">
								G{g.grade}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
