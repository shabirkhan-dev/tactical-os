"use client";

import { ArrowDown01Icon, ArrowUp01Icon, MoreHorizontalIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { type Admission, admissions as seedAdmissions } from "./admissions-data";
import { StatusBadge } from "./status-badge";

type SortKey = "id" | "student" | "grade" | "guardian" | "date" | "status";

type Col = {
	id: SortKey | "actions";
	label: string;
	sortable?: boolean;
	width?: string;
};

const COLUMNS: Col[] = [
	{ id: "id", label: "ID", sortable: true, width: "w-[90px]" },
	{ id: "student", label: "Student", sortable: true },
	{ id: "grade", label: "Grade", sortable: true, width: "w-[100px]" },
	{ id: "guardian", label: "Guardian", sortable: true },
	{ id: "date", label: "Applied", sortable: true, width: "w-[130px]" },
	{ id: "status", label: "Status", sortable: true, width: "w-[140px]" },
	{ id: "actions", label: "", width: "w-[56px]" },
];

type Props = {
	className?: string;
	query?: string;
};

function compareAdmissions(a: Admission, b: Admission, key: SortKey): number {
	return String(a[key]).localeCompare(String(b[key]), undefined, {
		numeric: true,
		sensitivity: "base",
	});
}

export function AdmissionsTable({ className, query = "" }: Props) {
	const [sortKey, setSortKey] = useState<SortKey>("date");
	const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

	const rows = useMemo(() => {
		const q = query.trim().toLowerCase();
		const filtered = q
			? seedAdmissions.filter((row) =>
					[row.id, row.student, row.grade, row.guardian, row.status].some((field) =>
						field.toLowerCase().includes(q),
					),
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
							<td
								colSpan={COLUMNS.length}
								className="px-4 py-10 text-center text-[13px] text-dashboard-text-muted"
							>
								No admissions match “{query.trim()}”.
							</td>
						</tr>
					) : (
						rows.map((a, i) => (
							<tr
								key={a.id}
								className={cn(
									"transition-colors hover:bg-dashboard-hover",
									i > 0 && "border-dashboard-border-subtle [&>td]:border-t",
								)}
							>
								<td className="py-3 pr-4 pl-4 font-medium text-[12.5px] text-dashboard-text-muted tabular-nums">
									{a.id}
								</td>
								<td className="py-3 pr-4 font-medium text-dashboard-text-primary">{a.student}</td>
								<td className="py-3 pr-4 text-dashboard-text-secondary">{a.grade}</td>
								<td className="py-3 pr-4 text-dashboard-text-secondary">{a.guardian}</td>
								<td className="py-3 pr-4 text-dashboard-text-muted tabular-nums">{a.date}</td>
								<td className="py-3 pr-4">
									<StatusBadge status={a.status} />
								</td>
								<td className="py-3 pr-3">
									<button
										type="button"
										aria-label={`Actions for ${a.student}`}
										title="Row actions coming soon"
										disabled
										className="flex size-7 items-center justify-center rounded-md border border-dashboard-border-strong bg-dashboard-surface text-dashboard-text-muted opacity-50"
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
