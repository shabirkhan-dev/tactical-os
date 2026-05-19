"use client";

import { cn } from "@/lib/utils";
import { DatePill } from "./date-pill";
import { ExportButton } from "./export-button";
import { PeriodSelect } from "./period-select";

type Props = {
	name?: string;
	className?: string;
	onExport?: () => void;
};

export function DashboardHeader({ name = "Salung", className, onExport }: Props) {
	return (
		<section
			className={cn(
				"rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px] dark:",
				className,
			)}
		>
			<div className="rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner px-4 py-3 ">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<h1 className="font-semibold text-[28px] text-dashboard-text-primary tracking-tight">
						Welcome back, {name}
					</h1>

					<div className="flex items-center gap-2">
						<PeriodSelect />
						<DatePill />
						<ExportButton onClick={onExport} />
					</div>
				</div>
			</div>
		</section>
	);
}
