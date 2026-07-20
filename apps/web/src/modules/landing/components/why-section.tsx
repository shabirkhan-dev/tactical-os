"use client";

import type { ReactNode } from "react";
import { LANDING_COPY, WHY_CARDS, type WhyCard } from "../data/landing.data";
import { FadeIn } from "./fade-in";
import { OpsPanel, SectionLabel, StatusBadge } from "./ops-ui";

const PREVIEW: Record<WhyCard["kind"], ReactNode> = {
	route: (
		<div className="space-y-2 font-mono text-[11px]">
			<div className="flex items-center gap-2">
				<StatusBadge tone="ok">assign</StatusBadge>
				<span className="text-muted-foreground">→</span>
				<StatusBadge tone="live">execute</StatusBadge>
				<span className="text-muted-foreground">→</span>
				<StatusBadge tone="ok">review</StatusBadge>
			</div>
			<p className="text-muted-foreground">one pipeline · web + mobile</p>
		</div>
	),
	keys: (
		<div className="grid grid-cols-2 gap-1 font-mono text-[10px]">
			{["operator", "instructor", "planner", "admin"].map((role) => (
				<span key={role} className="border border-border px-2 py-1 text-muted-foreground uppercase">
					{role}
				</span>
			))}
		</div>
	),
	ready: (
		<div className="space-y-2 font-mono text-[11px]">
			<StatusBadge tone="offline">no signal</StatusBadge>
			<p className="text-foreground">3 sessions queued locally</p>
			<p className="text-[var(--ops-ok)]">sync when online</p>
		</div>
	),
};

export function WhySection() {
	return (
		<section id="why" className="w-full border-border/60 border-t px-4 py-20 sm:px-8">
			<div className="mx-auto w-full max-w-6xl">
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
					<div className="max-w-xl">
						<FadeIn>
							<SectionLabel>{LANDING_COPY.whyLabel}</SectionLabel>
						</FadeIn>
						<FadeIn delay={0.06}>
							<h2 className="mt-4 text-balance font-semibold text-2xl text-foreground leading-tight sm:text-3xl">
								{LANDING_COPY.whyHeading}
							</h2>
						</FadeIn>
					</div>
					<FadeIn delay={0.1} className="max-w-md lg:pb-1">
						<p className="text-pretty text-muted-foreground text-sm leading-7">
							{LANDING_COPY.whySub}
						</p>
					</FadeIn>
				</div>

				<div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
					{WHY_CARDS.map((card, index) => (
						<FadeIn key={card.id} delay={0.08 + index * 0.06} y={20} className="h-full">
							<article className="flex h-full flex-col bg-card">
								<OpsPanel className="border-0 border-b" title={`0${index + 1} · preview`}>
									{PREVIEW[card.kind]}
								</OpsPanel>
								<div className="flex flex-1 flex-col p-4">
									<h3 className="font-medium text-foreground text-sm">{card.title}</h3>
									<p className="mt-2 text-pretty text-muted-foreground text-xs leading-6">
										{card.description}
									</p>
								</div>
							</article>
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}
