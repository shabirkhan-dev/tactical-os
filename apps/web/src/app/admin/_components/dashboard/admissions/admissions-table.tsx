"use client";

import { ArrowDown01Icon, ArrowUp01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { type Admission, admissions as seedAdmissions } from "./admissions-data";
import { StatusBadge } from "./status-badge";

type SortKey = "id" | "student" | "grade" | "guardian" | "date" | "status" | "campus";

type Col = {
	id: SortKey | "actions";
	label: string;
	sortable?: boolean;
	width?: string;
};

const COLUMNS: Col[] = [
	{ id: "student", label: "Applicant", sortable: true },
	{ id: "campus", label: "Campus", sortable: true, width: "w-[110px]" },
	{ id: "guardian", label: "Guardian", sortable: true },
	{ id: "date", label: "Applied", sortable: true, width: "w-[120px]" },
	{ id: "status", label: "Status", sortable: true, width: "w-[130px]" },
	{ id: "actions", label: "", width: "w-[52px]" },
];

const SOURCE_LABEL: Record<Admission["source"], string> = {
	portal: "Online portal",
	"walk-in": "Walk-in",
	referral: "Referral",
	transfer: "Transfer",
};

type Props = {
	className?: string;
	query?: string;
	onFilteredCount?: (count: number) => void;
};

function compareAdmissions(a: Admission, b: Admission, key: SortKey): number {
	return String(a[key]).localeCompare(String(b[key]), undefined, {
		numeric: true,
		sensitivity: "base",
	});
}

function initials(name: string): string {
	return name
		.split(/\s+/)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}

export function AdmissionsTable({ className, query = "" }: Props) {
	const [sortKey, setSortKey] = useState<SortKey>("date");
	const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

	const rows = useMemo(() => {
		const q = query.trim().toLowerCase();
		const filtered = q
			? seedAdmissions.filter((row) =>
					[
						row.id,
						row.student,
						row.email,
						row.grade,
						row.campus,
						row.guardian,
						row.status,
						row.source,
						row.note,
					].some((field) => field.toLowerCase().includes(q)),
				)
			: seedAdmissions;

		const sorted = [...filtered].sort((a, b) => compareAdmissions(a, b, sortKey));
		if (sortDir === "desc") sorted.reverse();
		return sorted;
	}, [query, sortDir, sortKey]);

	const toggleSort = (key: SortKey) => {
		if (sortKey === key) {
			setSortDir((d) => (d === "asc" ? "desc" : "asc"));
			return;
		}
		setSortKey(key);
		setSortDir(key === "date" ? "desc" : "asc");
	};

	return (
		<div className={cn("overflow-x-auto", className)}>
			<table className="w-full border-separate border-spacing-0 text-[13px]">
				<thead>
					<tr className="text-left">
						{COLUMNS.map((col) => (
							<th
								key={col.id}
								className={cn(
									"py-2.5 pr-4 font-medium text-[11px] text-dashboard-text-muted uppercase tracking-[0.06em] first:pl-4 last:pr-3",
									col.width,
								)}
							>
								{col.sortable ? (
									<button
										type="button"
										onClick={() => toggleSort(col.id as SortKey)}
										className="inline-flex items-center gap-1 rounded-md transition-colors hover:text-dashboard-text-secondary"
										aria-label={`Sort by ${col.label}`}
									>
										{col.label}
										<HugeiconsIcon
											icon={
												sortKey === col.id
													? sortDir === "asc"
														? ArrowUp01Icon
														: ArrowDown01Icon
													: ArrowDown01Icon
											}
											size={12}
											strokeWidth={2}
											className={cn(
												sortKey === col.id
													? "text-dashboard-text-secondary"
													: "text-dashboard-text-faint opacity-50",
											)}
										/>
									</button>
								) : (
									<span className="sr-only">{col.label || "Actions"}</span>
								)}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.length === 0 ? (
						<tr>
							<td colSpan={COLUMNS.length} className="px-4 py-12 text-center">
								<p className="font-medium text-[14px] text-dashboard-text-primary">
									No matching admissions
								</p>
								<p className="mx-auto mt-1 max-w-sm text-[12.5px] text-dashboard-text-muted leading-5">
									Nothing matches “{query.trim()}”. Try a student name, campus, or status.
								</p>
							</td>
						</tr>
					) : (
						rows.map((a, i) => (
							<tr
								key={a.id}
								className={cn(
									"group/row transition-colors hover:bg-dashboard-hover",
									i > 0 && "border-dashboard-border-subtle [&>td]:border-t",
								)}
							>
								<td className="py-3.5 pr-4 pl-4">
									<div className="flex min-w-0 items-start gap-3">
										<span
											aria-hidden
											className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-dashboard-surface-elevated font-semibold text-[11px] text-dashboard-text-secondary ring-1 ring-dashboard-border-subtle"
										>
											{initials(a.student)}
										</span>
										<span className="min-w-0">
											<span className="block truncate font-medium text-[13px] text-dashboard-text-primary">
												{a.student}
											</span>
											<span className="mt-0.5 block truncate text-[11.5px] text-dashboard-text-muted">
												{a.id} · {a.grade} · {SOURCE_LABEL[a.source]}
											</span>
											<span className="mt-0.5 block truncate text-[11px] text-dashboard-text-dim">
												{a.note}
											</span>
										</span>
									</div>
								</td>
								<td className="py-3.5 pr-4 align-top">
									<span className="block font-medium text-[12.5px] text-dashboard-text-secondary">
										{a.campus}
									</span>
									<span className="mt-0.5 block text-[11px] text-dashboard-text-dim">
										{a.grade}
									</span>
								</td>
								<td className="py-3.5 pr-4 align-top">
									<span className="block font-medium text-[12.5px] text-dashboard-text-secondary">
										{a.guardian}
									</span>
									<span className="mt-0.5 block text-[11.5px] text-dashboard-text-muted">
										{a.guardianRelation} · {a.guardianPhone}
									</span>
								</td>
								<td className="py-3.5 pr-4 align-top text-dashboard-text-muted tabular-nums">
									<span className="block text-[12.5px]">{a.date}</span>
									<span className="mt-0.5 block text-[11px] text-dashboard-text-dim">
										{SOURCE_LABEL[a.source]}
									</span>
								</td>
								<td className="py-3.5 pr-4 align-top">
									<StatusBadge status={a.status} />
								</td>
								<td className="py-3.5 pr-3 align-top">
									<button
										type="button"
										aria-label={`Actions for ${a.student}`}
										title="Open admission detail"
										className="flex size-7 items-center justify-center rounded-md border border-dashboard-border-strong bg-dashboard-surface text-dashboard-text-muted opacity-70 transition-opacity hover:opacity-100 group-hover/row:opacity-100"
									>
										<HugeiconsIcon icon={MoreHorizontalIcon} size={13} strokeWidth={2} />
									</button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	);
}
