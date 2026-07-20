"use client";

import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { IncidentEvent } from "../data/landing.data";
import { INCIDENT_TIMELINE, LANDING_COPY, PRODUCT_BULLETS } from "../data/landing.data";
import { FadeIn } from "./fade-in";
import { SectionLabel, StatusBadge } from "./ops-ui";

export function ProductSection() {
	return (
		<section id="product" className="w-full border-border/60 border-t px-4 py-20 sm:px-8">
			<div className="mx-auto grid w-full max-w-6xl items-start gap-10 lg:grid-cols-2 lg:gap-14">
				<div>
					<FadeIn>
						<SectionLabel>{LANDING_COPY.productBadge}</SectionLabel>
					</FadeIn>

					<FadeIn delay={0.08}>
						<h2 className="mt-4 text-balance font-semibold text-2xl text-foreground leading-tight sm:text-3xl">
							{LANDING_COPY.productHeading}
						</h2>
					</FadeIn>

					<FadeIn delay={0.14}>
						<p className="mt-4 text-pretty text-muted-foreground text-sm leading-7 sm:text-base">
							{LANDING_COPY.productBody}
						</p>
					</FadeIn>

					<ul className="mt-6 flex flex-col gap-2">
						{PRODUCT_BULLETS.map((bullet, index) => (
							<FadeIn key={bullet} delay={0.1 + index * 0.04}>
								<li className="flex items-start gap-2.5 border border-border/60 bg-card/50 px-3 py-2.5">
									<HugeiconsIcon
										icon={Tick02Icon}
										className="mt-0.5 size-3.5 shrink-0 text-primary"
										strokeWidth={2.5}
										aria-hidden
									/>
									<span className="text-foreground/90 text-sm leading-6">{bullet}</span>
								</li>
							</FadeIn>
						))}
					</ul>
				</div>

				<FadeIn delay={0.1} y={20}>
					<div className="ops-console">
						<div className="flex items-center justify-between border-border border-b px-4 py-2.5">
							<span className="font-mono text-[10px] text-muted-foreground uppercase">
								training day timeline
							</span>
							<StatusBadge tone="live">in progress</StatusBadge>
						</div>
						<div className="divide-y divide-border">
							{INCIDENT_TIMELINE.map((event, index) => (
								<TimelineRow key={event.title} event={event} index={index} />
							))}
						</div>
					</div>
				</FadeIn>
			</div>
		</section>
	);
}

function TimelineRow({ event, index }: { event: IncidentEvent; index: number }) {
	const isOk = event.tone === "ok";

	return (
		<div className="flex items-start gap-3 px-4 py-3">
			<span className="mt-0.5 font-mono text-[10px] text-muted-foreground tabular-nums">
				{String(index + 1).padStart(2, "0")}
			</span>
			<div className="min-w-0 flex-1">
				<div className="flex flex-wrap items-center gap-2">
					<span className="font-medium text-foreground text-sm">{event.title}</span>
					{isOk ? <StatusBadge tone="ok">done</StatusBadge> : null}
				</div>
				<p className="mt-1 font-mono text-[11px] text-muted-foreground">{event.detail}</p>
			</div>
		</div>
	);
}
