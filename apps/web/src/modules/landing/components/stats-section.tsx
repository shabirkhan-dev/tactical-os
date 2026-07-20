"use client";

import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { STATS, type Stat } from "../data/landing.data";
import { ATLAS_EASE } from "../lib/motion";
import { FadeIn } from "./fade-in";
import { SectionLabel } from "./ops-ui";

export function StatsSection() {
	return (
		<section id="stats" className="border-border/60 border-t px-4 py-20 sm:px-8">
			<div className="mx-auto w-full max-w-6xl">
				<div className="mx-auto max-w-2xl text-center">
					<FadeIn>
						<SectionLabel>readiness metrics</SectionLabel>
					</FadeIn>
					<FadeIn delay={0.08}>
						<h2 className="mt-4 text-balance font-semibold text-2xl text-foreground leading-tight sm:text-3xl">
							Built for training days that need proof, not paperwork.
						</h2>
					</FadeIn>
				</div>

				<div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-border bg-border lg:grid-cols-4">
					{STATS.map((stat, index) => (
						<StatCell key={stat.label} stat={stat} index={index} />
					))}
				</div>
			</div>
		</section>
	);
}

function StatCell({ stat, index }: { stat: Stat; index: number }) {
	return (
		<motion.div
			className="flex flex-col items-center justify-center bg-card px-6 py-10 text-center"
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{ duration: 0.5, delay: index * 0.06, ease: ATLAS_EASE }}
			whileHover={{ scale: 1.02 }}
		>
			<span className="font-mono text-3xl text-primary tabular-nums tracking-tight sm:text-4xl">
				{stat.display ? (
					stat.display
				) : (
					<CountUp to={stat.value} prefix={stat.prefix} suffix={stat.suffix} delay={index * 0.05} />
				)}
			</span>
			<span className="mt-3 text-sm text-muted-foreground">{stat.label}</span>
			{stat.detail ? (
				<span className="mt-1 text-muted-foreground/70 text-xs">{stat.detail}</span>
			) : null}
		</motion.div>
	);
}

type CountUpProps = {
	to: number;
	prefix: string;
	suffix: string;
	delay?: number;
};

function CountUp({ to, prefix, suffix, delay = 0 }: CountUpProps) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-60px" });
	const [value, setValue] = useState(0);

	useEffect(() => {
		if (!inView) {
			return;
		}

		const controls = animate(0, to, {
			duration: 1.4,
			delay,
			ease: ATLAS_EASE,
			onUpdate: (latest) => setValue(latest),
		});

		return () => controls.stop();
	}, [inView, to, delay]);

	return (
		<span ref={ref}>
			{prefix}
			{Math.round(value)}
			{suffix}
		</span>
	);
}
