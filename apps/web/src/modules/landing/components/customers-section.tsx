"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { CUSTOMER_LOGOS, LANDING_COPY } from "../data/landing.data";
import { FadeIn } from "./fade-in";
import { SectionLabel } from "./ops-ui";

export function CustomersSection() {
	return (
		<section id="customers" className="border-border/60 border-t px-4 py-14 sm:px-8">
			<div className="mx-auto w-full max-w-6xl">
				<FadeIn>
					<SectionLabel>{LANDING_COPY.customersTitle}</SectionLabel>
				</FadeIn>

				<FadeIn delay={0.1} className="mt-6">
					<div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
						{CUSTOMER_LOGOS.map(({ name, icon }) => (
							<div
								key={name}
								className="flex items-center gap-2.5 bg-card px-4 py-4 text-muted-foreground transition-colors hover:text-foreground"
							>
								<HugeiconsIcon icon={icon} className="size-4 shrink-0" strokeWidth={1.75} />
								<span className="font-mono text-[11px] uppercase tracking-wide">{name}</span>
							</div>
						))}
					</div>
				</FadeIn>
			</div>
		</section>
	);
}
