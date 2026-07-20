"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";
import { DashboardCardFooter, DashboardCardHeader, FooterSep, InsightStat } from "../card-chrome";
import { AiInsightButton } from "./ai-insight-button";
import { DateRangePill } from "./date-range-pill";
import { GradeChart } from "./grade-chart";

type Props = {
	className?: string;
};

export function GradeDistributionCard({ className }: Props) {
	return (
		<section
			className={cn(
				"overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-surface shadow-(--dashboard-shadow-card)",
				className,
			)}
			aria-label="Sessions by drill type"
		>
			<DashboardCardHeader
				title="Sessions by Drill Type"
				description="Volume balance across CQB, marksmanship, physical, and qualification blocks."
				meta="Q3 · 2026 · all cohorts"
				info="Hover a bar for exact session count. CQB leads during qual weeks."
				actions={<DateRangePill label="Q3 · 2026" />}
			/>

			<div className="p-3 sm:p-5">
				<div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
					<InsightStat
						label="Logged this quarter"
						value="1,842"
						hint="Peak at CQB · lightest at Custom"
					/>
					<div className="w-full rounded-[12px] border border-dashboard-border-subtle bg-dashboard-surface/70 px-3 py-2.5 text-[12px] text-dashboard-text-muted leading-4 sm:w-auto sm:max-w-[200px]">
						<div className="font-medium text-[11px] text-dashboard-text-dim uppercase tracking-[0.05em]">
							Watch
						</div>
						<p className="mt-1 text-dashboard-text-secondary">
							Bravo physical block at 92% capacity — add overflow lane Friday.
						</p>
					</div>
				</div>

				<p className="mb-2 text-[11px] text-dashboard-text-dim sm:hidden">
					Swipe chart horizontally
				</p>
				<div className="min-w-0 overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
					<div className="min-w-[300px]">
						<GradeChart />
					</div>
				</div>

				<AiInsightButton
					label="Get AI insight on drill distribution"
					className="mt-5"
					disabled
					title="AI insights connect after Nest AI assist is enabled"
				/>
			</div>

			<DashboardCardFooter
				action={
					<button
						type="button"
						className="inline-flex items-center gap-1 font-medium text-[12px] text-dashboard-accent transition-colors hover:text-dashboard-accent-hover"
					>
						Drill catalog
						<HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2} />
					</button>
				}
			>
				<span>
					Avg <span className="font-semibold text-dashboard-text-secondary">307</span>/type
				</span>
				<FooterSep />
				<span>
					Spread <span className="font-semibold text-dashboard-text-secondary">214</span> sessions
				</span>
			</DashboardCardFooter>
		</section>
	);
}
