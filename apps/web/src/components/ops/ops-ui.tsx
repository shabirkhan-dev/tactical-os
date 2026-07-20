import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StatusTone = "live" | "offline" | "ok" | "warn" | "muted";

const STATUS_STYLES: Record<StatusTone, string> = {
	live: "border-[var(--ops-live)]/40 bg-[var(--ops-live)]/10 text-[var(--ops-live)]",
	offline: "border-[var(--ops-amber)]/40 bg-[var(--ops-amber)]/10 text-[var(--ops-amber)]",
	ok: "border-[var(--ops-ok)]/40 bg-[var(--ops-ok)]/10 text-[var(--ops-ok)]",
	warn: "border-[var(--ops-amber)]/40 bg-[var(--ops-amber)]/10 text-[var(--ops-amber)]",
	muted: "border-dashboard-border bg-dashboard-surface-strong text-dashboard-text-muted",
};

export function OpsStatusBadge({
	children,
	tone = "muted",
	className,
}: {
	children: ReactNode;
	tone?: StatusTone;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
				STATUS_STYLES[tone],
				className,
			)}
		>
			{(tone === "live" || tone === "ok") && (
				<span className="size-1.5 rounded-full bg-current atlas-live-dot" aria-hidden />
			)}
			{children}
		</span>
	);
}

export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
	return (
		<span
			className={cn(
				"inline-flex items-center border border-dashboard-border bg-dashboard-surface px-2.5 py-1 font-mono text-[10px] text-dashboard-text-muted uppercase tracking-widest",
				className,
			)}
		>
			{children}
		</span>
	);
}

export function OpsPanel({
	children,
	className,
	title,
	badge,
}: {
	children: ReactNode;
	className?: string;
	title?: string;
	badge?: ReactNode;
}) {
	return (
		<div className={cn("border border-dashboard-border bg-dashboard-surface", className)}>
			{(title || badge) && (
				<div className="flex items-center justify-between gap-2 border-dashboard-border border-b px-3 py-2">
					{title ? (
						<span className="font-mono text-[10px] text-dashboard-text-muted uppercase tracking-wider">
							{title}
						</span>
					) : (
						<span />
					)}
					{badge}
				</div>
			)}
			<div className="flex-1 p-3">{children}</div>
		</div>
	);
}

export function OpsDataRow({
	label,
	value,
	delta,
	className,
}: {
	label: string;
	value: string;
	delta?: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex items-center justify-between gap-3 border-dashboard-border/60 border-b py-2 font-mono text-xs last:border-0",
				className,
			)}
		>
			<span className="text-dashboard-text-muted">{label}</span>
			<span className="flex items-center gap-2 text-dashboard-text-primary">
				{value}
				{delta ? <span className="text-[10px] text-[var(--ops-ok)]">{delta}</span> : null}
			</span>
		</div>
	);
}
