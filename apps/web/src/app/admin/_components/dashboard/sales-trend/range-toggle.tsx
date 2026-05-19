"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type Range = "Weekly" | "Monthly" | "Yearly";

const ranges: Range[] = ["Weekly", "Monthly", "Yearly"];

type Props = {
	value?: Range;
	onChange?: (r: Range) => void;
	className?: string;
};

export function RangeToggle({ value: controlled, onChange, className }: Props) {
	const [internal, setInternal] = useState<Range>("Monthly");
	const value = controlled ?? internal;

	return (
		<div
			className={cn(
				"inline-flex h-8 items-center gap-0.5 rounded-lg border border-dashboard-border bg-dashboard-surface-elevated p-0.5",
				className,
			)}
		>
			{ranges.map((r) => {
				const active = r === value;
				return (
					<button
						key={r}
						type="button"
						onClick={() => {
							setInternal(r);
							onChange?.(r);
						}}
						className={cn(
							"h-7 rounded-md px-3 font-medium text-[12px] transition-all",
							active
								? "border border-dashboard-border-strong bg-dashboard-surface-hover text-dashboard-text-primary "
								: "text-dashboard-text-muted hover:text-dashboard-text-primary",
						)}
					>
						{r}
					</button>
				);
			})}
		</div>
	);
}
