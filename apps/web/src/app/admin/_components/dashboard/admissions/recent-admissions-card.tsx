"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { DashboardCardFooter, DashboardCardHeader, FooterSep } from "../card-chrome";
import { drillSessions, sessionSummary } from "./admissions-data";
import { AdmissionsTable } from "./admissions-table";
import { AdmissionsToolbar } from "./admissions-toolbar";

type Props = {
	className?: string;
};

export function RecentAdmissionsCard({ className }: Props) {
	const [query, setQuery] = useState("");
	const summary = useMemo(() => sessionSummary(drillSessions), []);

	const filteredCount = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return drillSessions.length;
		return drillSessions.filter((row) =>
			[
				row.id,
				row.operator,
				row.email,
				row.drillType,
				row.cohort,
				row.instructor,
				row.status,
				row.range,
				row.note,
			].some((field) => field.toLowerCase().includes(q)),
		).length;
	}, [query]);

	return (
		<section
			className={cn(
				"flex w-full flex-col overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-surface shadow-(--dashboard-shadow-card)",
				className,
			)}
			aria-label="Recent drill sessions"
		>
			<DashboardCardHeader
				title="Recent Drill Sessions"
				description="Live and offline logs across cohorts — instructor, weapon config, score, and review status."
				meta={`Showing ${filteredCount} of ${summary.total} · updated a few minutes ago`}
				info="Search filters this list only. Mobile field logs sync when operators reconnect."
				actions={<AdmissionsToolbar query={query} onQueryChange={setQuery} className="w-full" />}
			/>

			<div className="shrink-0">
				<AdmissionsTable query={query} />
			</div>

			<DashboardCardFooter
				className="shrink-0"
				action={
					<button
						type="button"
						className="inline-flex items-center gap-1 font-medium text-[12px] text-dashboard-accent transition-colors hover:text-dashboard-accent-hover"
					>
						View all sessions
						<HugeiconsIcon icon={ArrowRight01Icon} size={13} strokeWidth={2} />
					</button>
				}
			>
				<span>
					<span className="font-semibold text-dashboard-text-secondary">{summary.review}</span>{" "}
					needs review
				</span>
				<FooterSep />
				<span>
					<span className="font-semibold text-dashboard-text-secondary">{summary.running}</span>{" "}
					running now
				</span>
				<FooterSep />
				<span>
					<span className="font-semibold text-dashboard-text-secondary">{summary.qualified}</span>{" "}
					qualified this week
				</span>
			</DashboardCardFooter>
		</section>
	);
}
