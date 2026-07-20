"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { motion } from "motion/react";
import Link from "next/link";
import { LANDING_COPY } from "../data/landing.data";
import { ConsolePreview } from "./console-preview";
import { FadeIn } from "./fade-in";
import { SectionLabel } from "./ops-ui";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection() {
	return (
		<section className="w-full px-4 py-12 sm:px-8 sm:py-16">
			<div className="mx-auto w-full max-w-6xl">
				<div className="grid items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
					<div className="max-w-xl">
						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: EASE }}
						>
							<SectionLabel>{LANDING_COPY.heroBadge}</SectionLabel>
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55, delay: 0.06, ease: EASE }}
							className="mt-5 text-balance font-semibold text-3xl text-foreground leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.65rem]"
						>
							{LANDING_COPY.heroTitlePrimary}
							<span className="mt-1 block font-mono text-lg text-primary font-normal sm:text-xl">
								{LANDING_COPY.heroTitleSecondary}
							</span>
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55, delay: 0.12, ease: EASE }}
							className="mt-5 text-pretty text-muted-foreground text-sm leading-7 sm:text-base"
						>
							{LANDING_COPY.heroSubtitle}
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 12 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
							className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
						>
							<Link
								href="#product"
								className="inline-flex h-11 items-center justify-center gap-2 bg-primary px-5 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90"
							>
								{LANDING_COPY.heroCtaPrimary}
								<HugeiconsIcon icon={ArrowRight01Icon} className="size-4" aria-hidden />
							</Link>
							<Link
								href="http://localhost:3002/docs"
								className="inline-flex h-11 items-center justify-center gap-2 border border-border bg-card px-5 font-medium text-foreground text-sm transition-colors hover:bg-muted/50"
							>
								{LANDING_COPY.heroCtaSecondary}
							</Link>
						</motion.div>

						<motion.dl
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5, delay: 0.28, ease: EASE }}
							className="mt-10 grid grid-cols-3 gap-px border border-border bg-border"
						>
							{[
								{ k: "drills", v: "5 types" },
								{ k: "mobile", v: "offline" },
								{ k: "roles", v: "3 core" },
							].map((item) => (
								<div key={item.k} className="bg-card px-3 py-3">
									<dt className="font-mono text-[10px] text-muted-foreground uppercase">
										{item.k}
									</dt>
									<dd className="mt-1 font-medium text-foreground text-sm">{item.v}</dd>
								</div>
							))}
						</motion.dl>
					</div>

					<FadeIn delay={0.15} y={24}>
						<ConsolePreview />
					</FadeIn>
				</div>
			</div>
		</section>
	);
}
