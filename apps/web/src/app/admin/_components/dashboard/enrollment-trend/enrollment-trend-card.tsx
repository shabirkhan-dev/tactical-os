"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { DashboardCardFooter, DashboardCardHeader, FooterSep, InsightStat } from "../card-chrome";
import { LegendDot } from "./legend-dot";
import { PixelGridChart } from "./pixel-grid-chart";
import { RangeToggle } from "./range-toggle";

type Props = {
	className?: string;
};

export function EnrollmentTrendCard({ className }: Props) {
	return (
		<section
			className={cn(
				"overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-surface shadow-(--dashboard-shadow-card)",
				className,
			)}
			aria-label="Drill volume trend"
		>
			<DashboardCardHeader
				title="Drill Volume Trend"
				description="New sessions versus returning operators across the training cycle."
				meta="Q3 qual window · Alpha + Bravo"
				info="Each column cluster is a month. Accent cells are new sessions; muted cells are repeat drills."
				actions={<RangeToggle className="w-full sm:w-auto" />}
			/>

			<div className="min-w-0 p-3 sm:p-5">
				<div className="mb-4 grid grid-cols-2 gap-4 sm:mb-5 sm:flex sm:flex-wrap sm:items-start sm:justify-between sm:gap-6">
					<div className="col-span-2 grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:gap-8 lg:grid-cols-none">
						<InsightStat
							label="Total sessions"
							value="1,842"
							hint="+186 this month · 94% synced from mobile"
						/>
						<InsightStat
							label="New this month"
							value="186"
							hint="Jul peak · 24 CQB quals pending"
						/>
						<InsightStat
							label="Repeat rate"
							value="68.4%"
							hint="Operators logging follow-up drills"
							className="col-span-2 sm:col-span-1"
						/>
					</div>
					<div className="col-span-2 flex flex-wrap items-center gap-3 sm:gap-4 sm:pt-1">
						<LegendDot color="var(--dashboard-accent)" label="New sessions" />
						<LegendDot color="var(--dashboard-chart-dot)" label="Returning" />
					</div>
				</div>

				<div className="mb-3 rounded-[12px] border border-dashboard-border-subtle bg-dashboard-surface/70 px-3 py-2.5 text-[12.5px] text-dashboard-text-secondary leading-5 sm:mb-4 sm:px-3.5">
					<span className="font-medium text-dashboard-text-primary">July spike:</span> CQB
					qualification week drove +19% session volume vs June. Range B is at capacity — overflow
					routed to Kill House 2.
				</div>

				<p className="mb-2 text-[11px] text-dashboard-text-dim md:hidden">
					Swipe chart horizontally
				</p>
				<div className="min-w-0 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
					<PixelGridChart highlightMonth="JUL" className="min-w-[520px] sm:min-w-[560px]" />
				</div>
			</div>

			<DashboardCardFooter
				action={
					<button
						type="button"
						className="inline-flex items-center gap-1 font-medium text-[12px] text-dashboard-accent transition-colors hover:text-dashboard-accent-hover"
					>
						Open training plan
						<HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2} />
					</button>
				}
			>
				<span>
					<span className="font-semibold text-dashboard-text-secondary">3</span> offline pending
				</span>
				<FooterSep />
				<span>
					<span className="font-semibold text-dashboard-text-secondary">2</span> ranges near
					capacity
				</span>
				<FooterSep />
				<span className="hidden sm:inline">Updated 14:02</span>
			</DashboardCardFooter>
		</section>
	);
}
