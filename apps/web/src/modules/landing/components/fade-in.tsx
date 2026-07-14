"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { ATLAS_EASE } from "../lib/motion";
import { cn } from "../lib/utils";

type FadeInProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	y?: number;
	blur?: number;
	duration?: number;
	once?: boolean;
};

export function FadeIn({
	children,
	className,
	delay = 0,
	y = 24,
	blur = 8,
	duration = 0.7,
	once = true,
}: FadeInProps) {
	const reduceMotion = useReducedMotion();

	if (reduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
			whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			viewport={{ once, margin: "-80px" }}
			transition={{ duration, delay, ease: ATLAS_EASE }}
		>
			{children}
		</motion.div>
	);
}

type StaggerProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	stagger?: number;
	once?: boolean;
};

export function Stagger({
	children,
	className,
	delay = 0,
	stagger = 0.08,
	once = true,
}: StaggerProps) {
	const reduceMotion = useReducedMotion();

	const container: Variants = {
		hidden: {},
		show: {
			transition: { staggerChildren: stagger, delayChildren: delay },
		},
	};

	if (reduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			className={className}
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once, margin: "-80px" }}
		>
			{children}
		</motion.div>
	);
}

type StaggerItemProps = {
	children: ReactNode;
	className?: string;
	y?: number;
};

export function StaggerItem({ children, className, y = 20 }: StaggerItemProps) {
	const reduceMotion = useReducedMotion();

	const item: Variants = {
		hidden: { opacity: 0, y, filter: "blur(6px)" },
		show: {
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			transition: { duration: 0.6, ease: ATLAS_EASE },
		},
	};

	if (reduceMotion) {
		return <div className={cn(className)}>{children}</div>;
	}

	return (
		<motion.div className={cn(className)} variants={item}>
			{children}
		</motion.div>
	);
}
