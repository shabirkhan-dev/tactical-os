/** Tactical OS mobile palette — aligned with web ops console (olive / amber on dark). */
export const NeonColors = {
	background: "#0E0F0C",
	surface: "#161814",
	card: {
		gradient: ["#1C1F18", "#121410"] as const,
		border: "rgba(196, 214, 140, 0.12)",
	},
	text: {
		primary: "#F2F4EC",
		secondary: "#9AA38A",
		muted: "#4A5244",
	},
	accent: {
		green: "#A3C44A",
		olive: "#6B7A3A",
		orange: "#D4A017",
		amber: "#E8B84A",
		blue: "#5C8A9A",
		red: "#C44A4A",
		purple: "#8A7A9A",
		yellow: "#D4C44A",
		cyan: "#6A9A8A",
		pink: "#9A6A7A",
		teal: "#4A8A7A",
	},
};

export const NeonShadows = {
	glow: {
		shadowColor: NeonColors.accent.green,
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.35,
		shadowRadius: 10,
		elevation: 10,
	},
};
