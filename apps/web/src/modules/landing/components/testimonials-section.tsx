"use client";

import { TESTIMONIALS_ROW_ONE, TESTIMONIALS_ROW_TWO, type Testimonial } from "../data/landing.data";
import { FadeIn } from "./fade-in";
import { SectionLabel } from "./ops-ui";

const ALL_TESTIMONIALS = [...TESTIMONIALS_ROW_ONE, ...TESTIMONIALS_ROW_TWO];

export function TestimonialsSection() {
	return (
		<section className="border-border/60 border-t px-4 py-20 sm:px-8">
			<div className="mx-auto w-full max-w-6xl">
				<div className="mb-10 max-w-2xl">
					<FadeIn>
						<SectionLabel>field reports</SectionLabel>
					</FadeIn>
					<FadeIn delay={0.08}>
						<h2 className="mt-4 font-semibold text-2xl text-foreground leading-tight sm:text-3xl">
							What academy leads say after switching from spreadsheets.
						</h2>
					</FadeIn>
				</div>

				<div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
					{ALL_TESTIMONIALS.map((testimonial, index) => (
						<FadeIn key={testimonial.seed} delay={index * 0.04}>
							<TestimonialCard testimonial={testimonial} />
						</FadeIn>
					))}
				</div>
			</div>
		</section>
	);
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
	return (
		<figure className="flex h-full flex-col justify-between bg-card p-5">
			<blockquote className="text-pretty text-foreground/90 text-sm leading-relaxed">
				“{testimonial.quote}”
			</blockquote>
			<figcaption className="mt-5 border-border border-t pt-4">
				<p className="font-medium text-foreground text-sm">{testimonial.name}</p>
				<p className="mt-0.5 font-mono text-[10px] text-muted-foreground uppercase">
					{testimonial.role}
				</p>
			</figcaption>
		</figure>
	);
}
