"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Props = {
	children: ReactNode;
	delay?: number;
	className?: string;
};

/** One-shot entrance: fade + 10px rise. Disabled under reduced motion. */
export function FadeIn({ children, delay = 0, className }: Props) {
	const reduce = useReducedMotion();
	return (
		<motion.div
			className={cn("min-w-0", className)}
			initial={reduce ? false : { opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, ease: EASE_OUT, delay }}
		>
			{children}
		</motion.div>
	);
}
