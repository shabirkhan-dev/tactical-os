"use client";

import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@school-os/ui/components/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AdmissionsTable } from "./admissions-table";
import { AdmissionsToolbar } from "./admissions-toolbar";

type Props = {
	className?: string;
};

export function RecentAdmissionsCard({ className }: Props) {
	const [query, setQuery] = useState("");

	return (
		<section
			className={cn(
				"overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-card-inner shadow-(--dashboard-shadow-card)",
				className,
			)}
			aria-label="Recent admissions"
		>
			<div className="flex flex-wrap items-center justify-between gap-3 border-dashboard-border border-b px-4 py-3">
				<div className="flex items-center gap-1.5">
					<h2 className="font-medium text-[11px] text-dashboard-text-muted uppercase tracking-[0.06em]">
						Recent Admissions
					</h2>
					<TooltipProvider delay={200}>
						<Tooltip>
							<TooltipTrigger
								render={(props) => (
									<button
										type="button"
										{...props}
										className="rounded-md text-dashboard-text-faint transition-colors hover:text-dashboard-text-muted"
										aria-label="About recent admissions"
									>
										<HugeiconsIcon icon={InformationCircleIcon} size={13} strokeWidth={1.8} />
									</button>
								)}
							/>
							<TooltipContent side="top" className="max-w-[220px]">
								Latest applications across campuses. Search filters this list only.
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
				<AdmissionsToolbar
					query={query}
					onQueryChange={setQuery}
					className="basis-full sm:basis-auto"
				/>
			</div>

			<div>
				<AdmissionsTable query={query} />
			</div>
		</section>
	);
}
