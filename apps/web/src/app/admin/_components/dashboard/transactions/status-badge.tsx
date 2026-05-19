"use client";

import { AlertCircleIcon, CheckmarkCircle02Icon, ReloadIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import type { TxStatus } from "./transactions-data";

type IconType = ComponentProps<typeof HugeiconsIcon>["icon"];

type StatusSpec = {
	label: string;
	icon: IconType;
	className: string;
};

const SPECS: Record<TxStatus, StatusSpec> = {
	success: {
		label: "Success",
		icon: CheckmarkCircle02Icon,
		className: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
	},
	pending: {
		label: "Pending",
		icon: AlertCircleIcon,
		className: "border-amber-500/25 bg-amber-500/10 text-amber-600 dark:text-amber-400",
	},
	refunded: {
		label: "Refunded",
		icon: ReloadIcon,
		className: "border-zinc-500/25 bg-zinc-500/10 text-zinc-600 dark:text-zinc-400",
	},
};

type Props = {
	status: TxStatus;
	className?: string;
};

export function StatusBadge({ status, className }: Props) {
	const spec = SPECS[status];
	return (
		<span
			className={cn(
				"inline-flex h-6 items-center gap-1.5 rounded-full border px-2.5 font-medium text-[11.5px]",
				spec.className,
				className,
			)}
		>
			<HugeiconsIcon icon={spec.icon} size={12} strokeWidth={2} />
			{spec.label}
		</span>
	);
}
