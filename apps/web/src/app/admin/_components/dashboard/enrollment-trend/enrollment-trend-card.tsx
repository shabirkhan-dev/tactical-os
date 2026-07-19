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
			aria-label="Enrollment trend"
		>
			<DashboardCardHeader
				title="Enrollment Trend"
				description="New admissions versus returning students across the academic year."
				meta="Fall planning window · Northwood + Riverside + District"
				info="Each column cluster is a month. Accent cells are new seats; muted cells are returning cohort."
				actions={<RangeToggle />}
			/>

			<div className="min-w-0 overflow-x-auto overscroll-x-contain p-4 sm:p-5">
				<div className="mb-5 flex min-w-[560px] flex-wrap items-start justify-between gap-6">
					<div className="flex flex-wrap gap-8">
						<InsightStat
							label="Total students"
							value="2,847"
							hint="+118 net since Jan · capacity 3,100"
						/>
						<InsightStat
							label="New this month"
							value="142"
							hint="Jul peak week · 38 pending offers"
						/>
						<InsightStat label="Retention" value="96.1%" hint="Returning cohort vs prior term" />
					</div>
					<div className="flex items-center gap-4 pt-1">
						<LegendDot color="var(--dashboard-accent)" label="New admissions" />
						<LegendDot color="var(--dashboard-chart-dot)" label="Returning" />
					</div>
				</div>

				<div className="mb-4 rounded-[12px] border border-dashboard-border-subtle bg-dashboard-surface/70 px-3.5 py-2.5 text-[12.5px] text-dashboard-text-secondary leading-5">
					<span className="font-medium text-dashboard-text-primary">July spike:</span> transfer
					window + portal reopen drove +19% new seats vs June. Riverside Grade 2 is near capacity —
					waitlist is active.
				</div>

				<PixelGridChart highlightMonth="JUL" className="min-w-[560px]" />
			</div>

			<DashboardCardFooter
				action={
					<button
						type="button"
						className="inline-flex items-center gap-1 font-medium text-[12px] text-dashboard-accent transition-colors hover:text-dashboard-accent-hover"
					>
						Open enrollment plan
						<HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2} />
					</button>
				}
			>
				<span>
					<span className="font-semibold text-dashboard-text-secondary">253</span> seats free
				</span>
				<FooterSep />
				<span>
					<span className="font-semibold text-dashboard-text-secondary">2</span> campuses near
					capacity
				</span>
				<FooterSep />
				<span>Updated 14:02</span>
			</DashboardCardFooter>
		</section>
	);
}
