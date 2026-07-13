"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

const BARS = 17;
const BAR_W = 4;
const CHART_H = 240;
const PAD_TOP = 14;
const PAD_BOTTOM = 22;

const COLOR_ACTIVE = "var(--dashboard-accent)";
const COLOR_DOT = "var(--dashboard-chart-dot)";
const DOT_SIZE = 5;
const DASHED_BG =
	"repeating-linear-gradient(to right, var(--dashboard-chart-leader) 0 2px, transparent 2px 6px)";

function mulberry32(seed: number) {
	let s = seed;
	return () => {
		s = (s + 0x6d2b79f5) | 0;
		let t = Math.imul(s ^ (s >>> 15), 1 | s);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

type Bar = { idx: number; valuePct: number };

function buildBars(): Bar[] {
	const rand = mulberry32(11);
	return Array.from({ length: BARS }).map((_, i) => ({
		idx: i,
		valuePct: 0.3 + rand() * 0.55,
	}));
}

const GRID_LEVELS = [0, 0.2, 0.4, 0.6, 0.8, 1];

type Props = {
	className?: string;
};

export function BreakdownChart({ className }: Props) {
	const bars = useMemo(buildBars, []);
	const inner = CHART_H - PAD_TOP - PAD_BOTTOM;

	return (
		<div className={cn("flex w-full flex-col", className)}>
			<div className="relative w-full" style={{ height: CHART_H }}>
				{/* horizontal grid lines: left dot + dotted leader only (no right end-cap) */}
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

				{/* bars (filled only) */}
				<div
					className="absolute inset-0 flex items-end justify-between px-3"
					style={{ paddingTop: PAD_TOP, paddingBottom: PAD_BOTTOM }}
				>
					{bars.map((b) => {
						const activeH = inner * b.valuePct;
						return (
							<span
								key={b.idx}
								className="rounded-full"
								style={{
									backgroundColor: COLOR_ACTIVE,
									width: BAR_W,
									height: activeH,
								}}
							/>
						);
					})}
				</div>
			</div>

			{/* X-axis: text · dot · dotted leader · dot · text */}
			<div className="mt-3 flex items-center gap-2 font-medium text-[11px] text-dashboard-text-muted uppercase">
				<span>1 JAN</span>
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
				<span
					aria-hidden
					className="shrink-0 rounded-full"
					style={{
						width: DOT_SIZE,
						height: DOT_SIZE,
						backgroundColor: COLOR_DOT,
					}}
				/>
				<span>30 JAN 2025</span>
			</div>
		</div>
	);
}
