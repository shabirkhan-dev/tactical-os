import { Pressable, StyleSheet, Text, View } from "react-native";
import { NeonCard } from "@/components/ui/neon-card";
import { NeonColors } from "@/constants/design-system";

export function SpendingWidget() {
	const categories = [
		{ name: "9mm FMJ", amount: 240, color: NeonColors.accent.orange },
		{ name: "5.56 NATO", amount: 180, color: NeonColors.accent.purple },
		{ name: "Shotgun", amount: 48, color: NeonColors.accent.blue },
		{ name: "Dry Fire", amount: 0, color: NeonColors.accent.green },
	];

	return (
		<Pressable style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
			<NeonCard>
				<Text style={styles.label}>ROUNDS FIRED — TODAY</Text>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>
						468<Text style={styles.decimal}> rnd</Text>
					</Text>
					<Text style={styles.percentage}>78%</Text>
				</View>

				{/* Segmented Progress Bar */}
				<View style={styles.progressBar}>
					{[...Array(30)].map((_, i) => {
						let color = NeonColors.text.muted;
						if (i < 8) color = NeonColors.accent.orange;
						else if (i < 15) color = NeonColors.accent.purple;
						else if (i < 20) color = NeonColors.accent.blue;
						else if (i < 24) color = NeonColors.accent.green;

						return (
							<View
								key={`segment-${i}`}
								style={[styles.progressSegment, { backgroundColor: color }]}
							/>
						);
					})}
				</View>

				{/* Legend */}
				<View style={styles.legend}>
					{categories.map((cat) => (
						<View key={cat.name} style={styles.legendItem}>
							<View style={styles.legendLeft}>
								<View style={[styles.dot, { backgroundColor: cat.color }]} />
								<Text style={styles.categoryName}>{cat.name}</Text>
							</View>
							<Text style={styles.categoryAmount}>{cat.amount} rnd</Text>
						</View>
					))}
				</View>
			</NeonCard>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	label: {
		color: NeonColors.text.secondary,
		fontSize: 12,
		fontWeight: "700",
		letterSpacing: 2,
		marginBottom: 8,
	},
	amountContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		marginBottom: 20,
	},
	amount: {
		color: NeonColors.text.primary,
		fontSize: 42,
		fontWeight: "500",
	},
	decimal: {
		fontSize: 24,
		color: NeonColors.text.secondary,
	},
	percentage: {
		color: NeonColors.text.secondary,
		fontSize: 20,
		fontWeight: "400",
	},
	progressBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24,
	},
	progressSegment: {
		width: 3,
		height: 14,
		borderRadius: 2,
	},
	legend: {
		gap: 12,
	},
	legendItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	legendLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	dot: {
		width: 3,
		height: 12,
		borderRadius: 2,
	},
	categoryName: {
		color: NeonColors.text.primary,
		fontSize: 14,
		fontWeight: "500",
	},
	categoryAmount: {
		color: NeonColors.text.secondary,
		fontSize: 14,
		fontWeight: "400",
		fontFamily: "monospace",
	},
});
