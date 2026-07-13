"use client";

import { useAuth } from "@/context/auth-context";
import { userFirstName } from "@/lib/user-display";
import { cn } from "@/lib/utils";
import { DatePill } from "./date-pill";
import { ExportButton } from "./export-button";
import { PeriodSelect } from "./period-select";

type Props = {
	name?: string;
	className?: string;
	onExport?: () => void;
};

export function DashboardHeader({ name, className, onExport }: Props) {
	const { user } = useAuth();
	const greetingName = name ?? (user ? userFirstName(user.username) : "there");

	return (
		<section
			className={cn(
				"rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px] dark:",
				className,
			)}
		>
			<div className="rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner px-3 py-3 sm:px-4">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<h1 className="font-semibold text-[22px] text-dashboard-text-primary tracking-tight sm:text-[28px]">
						Welcome back, {greetingName}
					</h1>

					<div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
						<PeriodSelect />
						<DatePill />
						<ExportButton onClick={onExport} />
					</div>
				</div>
			</div>
		</section>
	);
}
