"use client";

import { MoreHorizontalIcon, UnfoldMoreIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { StatusBadge } from "./status-badge";
import { currency, transactions } from "./transactions-data";

type Col = {
	id: string;
	label: string;
	sortable?: boolean;
	align?: "left" | "right";
	width?: string;
};

const COLUMNS: Col[] = [
	{ id: "id", label: "ID", sortable: true, width: "w-[100px]" },
	{ id: "customer", label: "Customer", sortable: true },
	{ id: "product", label: "Product", sortable: true },
	{ id: "status", label: "Status", sortable: true, width: "w-[140px]" },
	{ id: "qty", label: "Qty", sortable: true, width: "w-[80px]" },
	{
		id: "unitPrice",
		label: "Unit Price",
		sortable: true,
		width: "w-[120px]",
	},
	{
		id: "totalRevenue",
		label: "Total Revenue",
		sortable: true,
		width: "w-[140px]",
	},
	{ id: "actions", label: "Actions", width: "w-[80px]" },
];

type Props = {
	className?: string;
};

export function TransactionsTable({ className }: Props) {
	const [selected, setSelected] = useState<Set<string>>(new Set());
	const [allSelected, setAllSelected] = useState(false);

	const toggleAll = () => {
		if (allSelected || selected.size > 0) {
			setSelected(new Set());
			setAllSelected(false);
		} else {
			setSelected(new Set(transactions.map((t) => t.id)));
			setAllSelected(true);
		}
	};

	const toggleRow = (id: string) => {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		setSelected(next);
		setAllSelected(next.size === transactions.length);
	};

	return (
		<div className={cn("overflow-x-auto", className)}>
			<table className="w-full border-separate border-spacing-0 text-[13px]">
				<thead>
					<tr className="text-left">
						<th className="w-[44px] py-2.5 pl-3">
							<Checkbox checked={allSelected} onChange={toggleAll} />
						</th>
						{COLUMNS.map((col) => (
							<th
								key={col.id}
								className={cn(
									"py-2.5 pr-4 font-medium text-[11px] text-dashboard-text-muted uppercase",
									col.width,
								)}
							>
								<span className="inline-flex items-center gap-1">
									{col.label}
									{col.sortable && (
										<HugeiconsIcon
											icon={UnfoldMoreIcon}
											size={12}
											strokeWidth={2}
											className="text-dashboard-text-faint"
										/>
									)}
								</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{transactions.map((tx, i) => (
						<tr
							key={tx.id}
							className={cn(
								"transition-colors hover:bg-dashboard-hover",
								i > 0 && "border-dashboard-border-subtle [&>td]:border-t",
							)}
						>
							<td className="py-3 pl-3">
								<Checkbox checked={selected.has(tx.id)} onChange={() => toggleRow(tx.id)} />
							</td>
							<td className="py-3 pr-4 font-medium text-[12.5px] text-dashboard-text-muted tabular-nums">
								{tx.id}
							</td>
							<td className="py-3 pr-4 font-medium text-dashboard-text-primary">{tx.customer}</td>
							<td className="py-3 pr-4 text-dashboard-text-secondary">{tx.product}</td>
							<td className="py-3 pr-4">
								<StatusBadge status={tx.status} />
							</td>
							<td className="py-3 pr-4 text-dashboard-text-primary tabular-nums">{tx.qty}</td>
							<td className="py-3 pr-4 text-dashboard-text-primary tabular-nums">
								{currency(tx.unitPrice)}
							</td>
							<td className="py-3 pr-4 font-semibold text-dashboard-text-primary tabular-nums">
								{currency(tx.totalRevenue)}
							</td>
							<td className="py-3 pr-3">
								<button
									type="button"
									aria-label="Row actions"
									className="flex size-7 items-center justify-center rounded-md border border-dashboard-border-strong bg-dashboard-surface text-dashboard-text-muted transition-colors hover:border-dashboard-border-focus hover:text-dashboard-text-primary"
								>
									<HugeiconsIcon icon={MoreHorizontalIcon} size={13} strokeWidth={2} />
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

type CheckboxProps = {
	checked: boolean;
	onChange: () => void;
};

function Checkbox({ checked, onChange }: CheckboxProps) {
	return (
		// biome-ignore lint/a11y/useSemanticElements: custom-styled checkbox
		<button
			type="button"
			role="checkbox"
			aria-checked={checked}
			onClick={onChange}
			className={cn(
				"flex size-4 items-center justify-center rounded-[4px] border transition-colors",
				checked
					? "border-dashboard-accent bg-dashboard-accent"
					: "border-dashboard-border-strong bg-transparent hover:border-dashboard-border-focus",
			)}
		>
			{checked && (
				<svg
					viewBox="0 0 12 12"
					className="size-2.5 text-white"
					fill="none"
					stroke="currentColor"
					strokeWidth="2.5"
					strokeLinecap="round"
					strokeLinejoin="round"
					role="img"
					aria-label="Checked"
				>
					<title>Checked</title>
					<path d="M2 6.5l2.5 2.5L10 3" />
				</svg>
			)}
		</button>
	);
}
