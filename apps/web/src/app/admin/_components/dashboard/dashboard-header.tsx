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
	const today = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	return (
		<section
			className={cn(
				"flex flex-col gap-4 border-dashboard-border border-b pb-5 md:flex-row md:items-end md:justify-between",
				className,
			)}
		>
			<div className="min-w-0">
				<div className="mb-1.5 flex items-center gap-2 text-[11px] text-dashboard-text-muted uppercase tracking-[0.08em]">
					<span className="size-1.5 rounded-full bg-emerald-500" />
					Live overview
				</div>
				<h1 className="font-semibold text-[24px] text-dashboard-text-primary leading-tight tracking-tight">
					Welcome back, {greetingName}
				</h1>
				<p className="mt-1 text-[13px] text-dashboard-text-muted">{today} · All campuses</p>
			</div>

			<div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
				<PeriodSelect />
				<DatePill />
				<ExportButton onClick={onExport} />
			</div>
		</section>
	);
}
