"use client";

import {
	AlertCircleIcon,
	CheckmarkCircle02Icon,
	ReloadIcon,
	StopIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import type { SessionStatus } from "./admissions-data";

type IconType = ComponentProps<typeof HugeiconsIcon>["icon"];

type StatusSpec = {
	label: string;
	icon: IconType;
	className: string;
};

const SPECS: Record<SessionStatus, StatusSpec> = {
	qualified: {
		label: "Qualified",
		icon: CheckmarkCircle02Icon,
		className: "border-[var(--ops-ok)]/30 bg-[var(--ops-ok)]/10 text-[var(--ops-ok)]",
	},
	review: {
		label: "Review",
		icon: AlertCircleIcon,
		className: "border-[var(--ops-amber)]/30 bg-[var(--ops-amber)]/10 text-[var(--ops-amber)]",
	},
	running: {
		label: "Running",
		icon: ReloadIcon,
		className: "border-[var(--ops-live)]/30 bg-[var(--ops-live)]/10 text-[var(--ops-live)]",
	},
	failed: {
		label: "Failed",
		icon: StopIcon,
		className:
			"border-dashboard-border-strong bg-dashboard-surface-strong text-dashboard-text-secondary",
	},
};

type Props = {
	status: SessionStatus;
	className?: string;
};

export function StatusBadge({ status, className }: Props) {
	const spec = SPECS[status];
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide",
				spec.className,
				className,
			)}
		>
			<HugeiconsIcon icon={spec.icon} size={11} strokeWidth={2} />
			{spec.label}
		</span>
	);
}
