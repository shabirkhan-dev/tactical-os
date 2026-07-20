"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { DEPLOY_TERMINAL, LANDING_COPY } from "../data/landing.data";
import { FadeIn } from "./fade-in";
import { SectionLabel, StatusBadge } from "./ops-ui";

export function CtaSection() {
	return (
		<section id="deploy" className="w-full border-border/60 border-t px-4 py-20 sm:px-8">
			<div className="mx-auto w-full max-w-3xl">
				<div className="text-center">
					<FadeIn>
						<SectionLabel>{LANDING_COPY.ctaBadge}</SectionLabel>
					</FadeIn>
					<FadeIn delay={0.08}>
						<h2 className="mt-4 text-balance font-semibold text-2xl text-foreground leading-tight sm:text-3xl">
							{LANDING_COPY.ctaHeading}
						</h2>
					</FadeIn>
					<FadeIn delay={0.12}>
						<p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground text-sm leading-7">
							{LANDING_COPY.ctaBody}
						</p>
					</FadeIn>
				</div>

				<FadeIn delay={0.16} className="mt-8" y={20}>
					<div className="ops-console text-left">
						<div className="flex items-center justify-between border-border border-b px-4 py-2">
							<span className="font-mono text-[10px] text-muted-foreground uppercase">
								training day sequence
							</span>
							<StatusBadge tone="live">pilot open</StatusBadge>
						</div>
						<div className="space-y-2 px-4 py-4 font-mono text-[12px]">
							{DEPLOY_TERMINAL.map((line) => (
								<div key={line.text} className="flex items-start gap-2">
									{line.tone === "prompt" ? (
										<>
											<span className="text-primary">&gt;</span>
											<span className="text-foreground">{line.text}</span>
										</>
									) : (
										<>
											<span className="text-[var(--ops-ok)]">✓</span>
											<span className="text-muted-foreground">{line.text}</span>
										</>
									)}
								</div>
							))}
						</div>
					</div>
				</FadeIn>

				<FadeIn delay={0.2} className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<Link
						href="#pricing"
						className="inline-flex h-11 items-center justify-center gap-2 bg-primary px-6 font-medium text-primary-foreground text-sm hover:bg-primary/90"
					>
						{LANDING_COPY.heroCtaPrimary}
						<HugeiconsIcon icon={ArrowRight01Icon} className="size-4" aria-hidden />
					</Link>
					<Link
						href="http://localhost:3002/docs"
						className="inline-flex h-11 items-center justify-center gap-2 border border-border bg-card px-6 font-medium text-foreground text-sm hover:bg-muted/50"
					>
						{LANDING_COPY.heroCtaSecondary}
					</Link>
				</FadeIn>
			</div>
		</section>
	);
}
