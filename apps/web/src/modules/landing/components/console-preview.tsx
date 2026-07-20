"use client";

import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { LANDING_COPY, WORKFLOW_STEPS } from "../data/landing.data";
import { OpsDataRow, OpsPanel, StatusBadge } from "./ops-ui";

const SPLITS = [
	{ id: "1", ms: "1.42s", hit: true },
	{ id: "2", ms: "1.38s", hit: true },
	{ id: "3", ms: "1.51s", hit: false },
	{ id: "4", ms: "1.44s", hit: true },
];

const ROSTER = [
	{ callsign: "ALPHA-1", drill: "CQB qual", status: "qualified" as const, delta: "+8%" },
	{ callsign: "ALPHA-2", drill: "CQB qual", status: "review" as const, delta: "+2%" },
	{ callsign: "ALPHA-3", drill: "CQB qual", status: "running" as const, delta: "—" },
];

export function ConsolePreview() {
	return (
		<div className="ops-console overflow-hidden">
			<div className="flex flex-wrap items-center justify-between gap-2 border-border border-b bg-card/80 px-4 py-2.5">
				<div className="flex flex-wrap items-center gap-3">
					<span className="font-mono text-[11px] text-foreground tracking-tight">
						TACTICAL<span className="text-primary">_</span>OS
					</span>
					<span className="hidden text-border sm:inline" aria-hidden>
						|
					</span>
					<span className="font-mono text-[10px] text-muted-foreground uppercase">
						{LANDING_COPY.workflowCardSub}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<StatusBadge tone="offline">offline queue</StatusBadge>
					<StatusBadge tone="live">session live</StatusBadge>
				</div>
			</div>

			<div className="grid gap-px bg-border md:grid-cols-2">
				<OpsPanel
					title="field · mobile session"
					badge={<StatusBadge tone="live">timer</StatusBadge>}
				>
					<div className="space-y-3">
						<div className="flex items-start justify-between gap-2">
							<div>
								<p className="font-medium text-foreground text-sm">
									{LANDING_COPY.workflowCardTitle}
								</p>
								<p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
									operator · carbine · 24 rds
								</p>
							</div>
							<p className="font-mono text-2xl text-primary tabular-nums tracking-tight">01:42.3</p>
						</div>

						<div className="grid grid-cols-4 gap-1">
							{SPLITS.map((split) => (
								<div
									key={split.id}
									className="border border-border bg-background/60 px-1.5 py-2 text-center"
								>
									<p className="font-mono text-[10px] text-muted-foreground">S{split.id}</p>
									<p className="font-mono text-xs text-foreground tabular-nums">{split.ms}</p>
									<p
										className={`mt-0.5 font-mono text-[9px] ${split.hit ? "text-[var(--ops-ok)]" : "text-[var(--ops-amber)]"}`}
									>
										{split.hit ? "HIT" : "MISS"}
									</p>
								</div>
							))}
						</div>

						<div className="border border-border bg-muted/30 px-3 py-2">
							<OpsDataRow label="weapon" value="carbine / red-dot" />
							<OpsDataRow label="accuracy" value="18/20" delta="+4%" />
							<OpsDataRow label="sync" value="queued" />
						</div>
					</div>
				</OpsPanel>

				<OpsPanel
					title="command · instructor board"
					badge={<StatusBadge tone="ok">3 operators</StatusBadge>}
				>
					<div className="overflow-x-auto">
						<table className="w-full min-w-[240px] border-collapse font-mono text-[11px]">
							<thead>
								<tr className="border-border border-b text-left text-[10px] text-muted-foreground uppercase">
									<th className="pb-2 pr-2 font-normal">callsign</th>
									<th className="pb-2 pr-2 font-normal">status</th>
									<th className="pb-2 text-right font-normal">Δ</th>
								</tr>
							</thead>
							<tbody>
								{ROSTER.map((row) => (
									<tr key={row.callsign} className="border-border/60 border-b last:border-0">
										<td className="py-2 pr-2 text-foreground">{row.callsign}</td>
										<td className="py-2 pr-2">
											<StatusBadge
												tone={
													row.status === "qualified"
														? "ok"
														: row.status === "running"
															? "live"
															: "warn"
												}
											>
												{row.status}
											</StatusBadge>
										</td>
										<td className="py-2 text-right text-[var(--ops-ok)] tabular-nums">
											{row.delta}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="mt-3 border border-[var(--ops-ok)]/30 bg-[var(--ops-ok)]/5 px-3 py-2">
						<div className="flex items-center gap-2">
							<HugeiconsIcon
								icon={Tick02Icon}
								className="size-3.5 text-[var(--ops-ok)]"
								aria-hidden
							/>
							<span className="font-mono text-[10px] text-[var(--ops-ok)] uppercase">
								{LANDING_COPY.workflowCompleteLabel}
							</span>
							<span className="ml-auto font-mono text-[10px] text-muted-foreground">09:42</span>
						</div>
					</div>
				</OpsPanel>
			</div>

			<div className="border-border border-t bg-card/40 px-4 py-2">
				<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
					{WORKFLOW_STEPS.map((step) => (
						<span
							key={step.id}
							className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground"
						>
							<span className="size-1 bg-primary" aria-hidden />
							{step.label}
						</span>
					))}
				</div>
			</div>
		</div>
	);
}
