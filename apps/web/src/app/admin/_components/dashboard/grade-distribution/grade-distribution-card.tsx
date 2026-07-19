"use client";

import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@school-os/ui/components/tooltip";
import { cn } from "@/lib/utils";
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
				"overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-card-inner shadow-(--dashboard-shadow-card)",
				className,
			)}
			aria-label="Students by grade"
		>
			<div className="flex items-center justify-between border-dashboard-border border-b px-4 py-3">
				<div className="flex items-center gap-1.5">
					<h2 className="font-medium text-[11px] text-dashboard-text-muted uppercase tracking-[0.06em]">
						Students by Grade
					</h2>
					<TooltipProvider delay={200}>
						<Tooltip>
							<TooltipTrigger
								render={(props) => (
									<button
										type="button"
										{...props}
										className="rounded-md text-dashboard-text-faint transition-colors hover:text-dashboard-text-muted"
										aria-label="About grade distribution"
									>
										<HugeiconsIcon icon={InformationCircleIcon} size={13} strokeWidth={1.8} />
									</button>
								)}
							/>
							<TooltipContent side="top" className="max-w-[220px]">
								Headcount by grade level for the current term.
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>

			<div className="p-4 sm:p-5">
				<div className="mb-5 flex flex-wrap items-start justify-between gap-3">
					<div className="space-y-1">
						<div className="text-[12.5px] text-dashboard-text-muted">Enrolled this term</div>
						<div className="font-semibold text-[28px] text-dashboard-text-primary leading-none tracking-tight tabular-nums">
							2,847
						</div>
					</div>
					<DateRangePill label="Term 1 · 2026" />
				</div>

				<GradeChart />

				<AiInsightButton
					label="Get AI insight on grade distribution"
					className="mt-5"
					disabled
					title="AI insights connect after Nest AI assist is enabled"
				/>
			</div>
		</section>
	);
}
