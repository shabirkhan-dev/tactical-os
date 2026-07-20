"use client";

import { Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { ReactNode } from "react";
import { CAPABILITY_CARDS, type CapabilityCard, LANDING_COPY } from "../data/landing.data";
import { FadeIn } from "./fade-in";
import { SectionLabel, StatusBadge } from "./ops-ui";

const PREVIEW: Record<CapabilityCard["kind"], ReactNode> = {
	reasoning: (
		<div className="space-y-2 font-mono text-[11px]">
			<div className="flex justify-between border-border border-b pb-2">
				<span className="text-muted-foreground">drill</span>
				<span className="text-foreground">cqb_qual</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">timer</span>
				<span className="text-primary">01:42.3</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">splits</span>
				<span className="text-foreground">4 logged</span>
			</div>
		</div>
	),
	tools: (
		<div className="space-y-1.5 font-mono text-[11px]">
			{["carbine", "red-dot", "24 rds"].map((item) => (
				<div key={item} className="flex items-center gap-2 text-foreground">
					<HugeiconsIcon icon={Tick02Icon} className="size-3 text-[var(--ops-ok)]" aria-hidden />
					{item}
				</div>
			))}
		</div>
	),
	memory: (
		<div className="flex flex-col gap-1.5">
			<StatusBadge tone="offline">offline queue · 2</StatusBadge>
			<StatusBadge tone="live">sync pending</StatusBadge>
		</div>
	),
	output: (
		<div className="space-y-1 font-mono text-[10px]">
			{[
				["ALPHA-1", "qual", "ok"],
				["ALPHA-2", "review", "warn"],
				["ALPHA-3", "live", "live"],
			].map(([name, status, tone]) => (
				<div key={name} className="flex items-center justify-between gap-2">
					<span className="text-muted-foreground">{name}</span>
					<StatusBadge tone={tone as "ok" | "warn" | "live"}>{status}</StatusBadge>
				</div>
			))}
		</div>
	),
	approval: (
		<div className="font-mono text-[11px]">
			<p className="text-muted-foreground">org / alpha cohort</p>
			<p className="mt-2 text-foreground">12 operators · 3 instructors</p>
			<p className="mt-1 text-[10px] text-[var(--ops-ok)]">tenant isolated</p>
		</div>
	),
};

export function CapabilitiesSection() {
	return (
		<section id="capabilities" className="w-full border-border/60 border-t px-4 py-20 sm:px-8">
			<div className="mx-auto w-full max-w-6xl">
				<div className="max-w-2xl">
					<FadeIn>
						<SectionLabel>{LANDING_COPY.capabilitiesBadge}</SectionLabel>
					</FadeIn>
					<FadeIn delay={0.08}>
						<h2 className="mt-4 text-balance font-semibold text-2xl text-foreground leading-tight sm:text-3xl">
							{LANDING_COPY.capabilitiesHeading}
						</h2>
					</FadeIn>
					<FadeIn delay={0.12}>
						<p className="mt-3 max-w-xl text-pretty text-muted-foreground text-sm leading-7">
							{LANDING_COPY.capabilitiesBody}
						</p>
					</FadeIn>
				</div>

				<div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
					{CAPABILITY_CARDS.map((card, index) => (
						<FadeIn key={card.title} delay={index * 0.05} y={16}>
							<CapabilityTile card={card} />
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}

function CapabilityTile({ card }: { card: CapabilityCard }) {
	return (
		<article className="flex h-full flex-col bg-card">
			<div className="border-border border-b p-4">{PREVIEW[card.kind]}</div>
			<div className="flex flex-1 flex-col p-4">
				<h3 className="font-medium text-foreground text-sm">{card.title}</h3>
				<p className="mt-2 flex-1 text-pretty text-muted-foreground text-xs leading-6">
					{card.description}
				</p>
			</div>
		</article>
	);
}
