"use client";

import { MeshGradient } from "@paper-design/shaders-react";
import { cn } from "../lib/utils";

/**
 * High-key luminous spots — dark navy stops make the whole plate muddy.
 * Bias toward mid/high luminance so grain doesn't crush the glow.
 */
const PALETTES = {
	blue: ["#dbe6ff", "#9db7ff", "#6b8cff", "#3b6ef5", "#2563eb", "#b8c9ff"],
	teal: ["#d5fbf6", "#99f6e4", "#5eead4", "#2dd4bf", "#14b8a6", "#a7f3d0"],
	lime: ["#ecfccb", "#d9f99d", "#a3e635", "#4ade80", "#22c55e", "#86efac"],
	amber: ["#fffbeb", "#fef3c7", "#fde68a", "#fbbf24", "#f59e0b", "#fcd34d"],
} as const;

/** Mid-tone foil rims for Why cards — high-key plate colors read as a white border. */
export const WHY_RIM_COLORS = {
	blue: ["#0ea5e9", "#38bdf8", "#7dd3fc", "#2563eb", "#67e8f9", "#a5b4fc"],
	lime: ["#22c55e", "#4ade80", "#86efac", "#10b981", "#a3e635", "#34d399"],
	amber: ["#f59e0b", "#fbbf24", "#fcd34d", "#fb923c", "#fde68a", "#fdba74"],
} as const;

export type MeshPalette = keyof typeof PALETTES;

type MeshCanvasProps = {
	className?: string;
	/** 0–1 grain amount. Kept low — grainOverlay darkens the plate. */
	intensity?: number;
	palette?: MeshPalette;
	/** Override palette stops (e.g. Why rim foil). */
	colors?: readonly string[];
	speed?: number;
};

/**
 * WebGL mesh-gradient shader (Paper Design) — bright grainy color plate
 * used behind product mockups and capability card previews.
 */
export function MeshCanvas({
	className,
	intensity = 0.28,
	palette = "blue",
	colors: colorsProp,
	speed = 0.28,
}: MeshCanvasProps) {
	const t = Math.min(1, Math.max(0, intensity));
	const colors = [...(colorsProp ?? PALETTES[palette])];
	const fallback =
		palette === "lime"
			? "bg-[#86efac]"
			: palette === "teal"
				? "bg-[#5eead4]"
				: palette === "amber"
					? "bg-[#fbbf24]"
					: "bg-[#6b8cff]";

	return (
		<div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
			<div className={cn("absolute inset-0", fallback)} aria-hidden />
			<MeshGradient
				colors={colors}
				distortion={0.78}
				swirl={0.18}
				grainMixer={0.35 + t * 0.25}
				grainOverlay={0.08 + t * 0.12}
				speed={speed}
				scale={1.12}
				style={{
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
				}}
			/>
		</div>
	);
}
