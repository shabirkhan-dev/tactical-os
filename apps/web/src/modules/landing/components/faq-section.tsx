"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { BouncyAccordion } from "@/components/motion/bouncy-accordion";
import { FAQ_ITEMS } from "../data/landing.data";
import { FadeIn } from "./fade-in";
import { SectionLabel } from "./ops-ui";

export function FaqSection() {
	const items = FAQ_ITEMS.map((item) => ({
		id: item.id,
		title: item.question,
		description: item.answer,
		icon: <HugeiconsIcon icon={item.icon} className="h-4 w-4" strokeWidth={2} />,
	}));

	return (
		<section id="faq" className="w-full border-border/60 border-t px-4 py-20 sm:px-8">
			<div className="mx-auto w-full max-w-3xl">
				<div className="mb-10 sm:mb-14">
					<FadeIn>
						<SectionLabel>faq</SectionLabel>
					</FadeIn>
					<FadeIn delay={0.06}>
						<h2 className="mt-4 text-balance font-semibold text-2xl text-foreground leading-tight sm:text-3xl">
							Questions academies ask before switching.
						</h2>
					</FadeIn>
					<FadeIn delay={0.1}>
						<p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground text-sm leading-7 sm:text-base">
							Offline mobile, drill types, weapons history, multi-tenant orgs, and how Tactical OS
							fits your training program.
						</p>
					</FadeIn>
				</div>

				<FadeIn delay={0.14} y={24}>
					<BouncyAccordion
						items={items}
						defaultValue="offline"
						classNames={{
							item: "border border-border/60 bg-card/80 shadow-none",
							trigger: "items-start py-4 hover:bg-muted/20",
							title: "overflow-visible whitespace-normal text-clip leading-snug",
							icon: "mt-0.5",
							chevron: "mt-0.5",
							description: "text-sm leading-6 sm:text-[15px]",
						}}
					/>
				</FadeIn>
			</div>
		</section>
	);
}
