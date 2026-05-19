import { LinearGradient } from "expo-linear-gradient";
import type * as React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import { NeonColors } from "@/constants/design-system";

interface NeonCardProps {
	children: React.ReactNode;
	style?: ViewStyle;
	glowPosition?: "top-right" | "bottom-left" | "both-diagonal" | "none";
}

export function NeonCard({ children, style }: NeonCardProps) {
	return (
		<View style={[styles.outerContainer, style]}>
			{/* Background Gradient Card */}
			<LinearGradient
				colors={NeonColors.card.gradient}
				style={styles.card}
				start={{ x: 0, y: 0 }}
				end={{ x: 0, y: 1 }}
			>
				<View style={styles.content}>{children}</View>
			</LinearGradient>
		</View>
	);
}

const styles = StyleSheet.create({
	outerContainer: {
		position: "relative",
		padding: 0, // Removed padding since external glows are gone
	},
	card: {
		borderRadius: 32,
		borderWidth: 1,
		borderColor: NeonColors.card.border,
		overflow: "hidden",
	},
	content: {
		padding: 24,
	},
});
