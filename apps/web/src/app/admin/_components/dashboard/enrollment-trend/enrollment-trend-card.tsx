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
				"overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-card-inner shadow-(--dashboard-shadow-card)",
				className,
			)}
			aria-label="Enrollment trend"
		>
			<div className="flex items-center justify-between border-dashboard-border border-b px-4 py-3">
				<div className="flex items-center gap-1.5">
					<h2 className="font-medium text-[11px] text-dashboard-text-muted uppercase tracking-[0.06em]">
						Enrollment Trend
					</h2>
					<TooltipProvider delay={200}>
						<Tooltip>
							<TooltipTrigger
								render={(props) => (
									<button
										type="button"
										{...props}
										className="rounded-md text-dashboard-text-faint transition-colors hover:text-dashboard-text-muted"
										aria-label="About enrollment trend"
									>
										<HugeiconsIcon icon={InformationCircleIcon} size={13} strokeWidth={1.8} />
									</button>
								)}
							/>
							<TooltipContent side="top" className="max-w-[220px]">
								New vs returning students by month for the selected range.
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>

			<div className="overflow-x-auto p-4 sm:p-5">
				<div className="mb-5 flex min-w-[560px] flex-wrap items-start justify-between gap-5">
					<div>
						<span className="text-[12px] text-dashboard-text-muted">Total students</span>
						<div className="mt-1 font-semibold text-[28px] text-dashboard-text-primary leading-none tracking-tight tabular-nums">
							2,847
						</div>
					</div>
					<div className="flex flex-wrap items-center gap-4 sm:gap-5">
						<div className="flex items-center gap-4">
							<LegendDot color="var(--dashboard-accent)" label="New admissions" />
							<LegendDot color="var(--dashboard-chart-dot)" label="Returning" />
						</div>
						<RangeToggle />
					</div>
				</div>

				<PixelGridChart highlightMonth="JUL" className="min-w-[560px]" />
			</div>
		</section>
	);
}
