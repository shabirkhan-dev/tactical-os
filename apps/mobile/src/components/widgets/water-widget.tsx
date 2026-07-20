import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G } from "react-native-svg";
import { NeonCard } from "@/components/ui/neon-card";
import { NeonColors } from "@/constants/design-system";

export function WaterWidget() {
	const days = ["S", "M", "T", "W", "T", "F", "S"];
	const data = [0.4, 0.6, 0.3, 0.5, 0.7, 0.9, 0.4];

	return (
		<Pressable style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
			<NeonCard>
				<View style={styles.header}>
					<View>
						<Text style={styles.amount}>
							12 <Text style={styles.unit}>drills this week</Text>
						</Text>
					</View>
					<View style={styles.circularProgress}>
						<Svg height="50" width="50" viewBox="0 0 50 50">
							<G rotation="-90" origin="25, 25">
								<Circle
									cx="25"
									cy="25"
									r="20"
									stroke={NeonColors.text.muted}
									strokeWidth="4"
									fill="none"
								/>
								<Circle
									cx="25"
									cy="25"
									r="20"
									stroke={NeonColors.accent.green}
									strokeWidth="4"
									fill="none"
									strokeDasharray={`${2 * Math.PI * 20}`}
									strokeDashoffset={`${2 * Math.PI * 20 * (1 - 0.76)}`}
									strokeLinecap="round"
								/>
							</G>
						</Svg>
						<Text style={styles.percentText}>76%</Text>
					</View>
				</View>

				<View style={styles.goalRow}>
					<Text style={styles.goalLabel}>WEEKLY GOAL</Text>
					<Text style={styles.goalValue}>16 sessions</Text>
				</View>
				<View style={styles.separator} />

				{/* Bar Chart */}
				<View style={styles.chartContainer}>
					{data.map((val, i) => (
						<View key={`water-${i}`} style={styles.barColumn}>
							<View style={styles.barWrapper}>
								<LinearGradient
									colors={[NeonColors.accent.blue, "#1A237E"]}
									style={[styles.bar, { height: `${val * 100}%` }]}
								>
									{i === 5 && <View style={styles.highlightBar} />}
								</LinearGradient>
							</View>
							<View style={[styles.dayCircle, i === 5 && styles.activeDayCircle]}>
								<Text style={[styles.dayText, i === 5 && styles.activeDayText]}>{days[i]}</Text>
							</View>
						</View>
					))}
				</View>

				<View style={styles.footer}>
					<Text style={styles.footerText}>◎ 1.7 SESSIONS / DAY AVG</Text>
				</View>
			</NeonCard>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	amount: {
		color: NeonColors.text.primary,
		fontSize: 48,
		fontWeight: "300",
	},
	unit: {
		fontSize: 20,
		color: NeonColors.text.secondary,
	},
	circularProgress: {
		position: "relative",
		justifyContent: "center",
		alignItems: "center",
	},
	percentText: {
		position: "absolute",
		color: NeonColors.text.primary,
		fontSize: 10,
		fontWeight: "700",
	},
	goalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	goalLabel: {
		color: NeonColors.text.secondary,
		fontSize: 12,
		fontWeight: "700",
		letterSpacing: 2,
	},
	goalValue: {
		color: NeonColors.text.primary,
		fontSize: 12,
		fontWeight: "700",
	},
	separator: {
		height: 1,
		backgroundColor: NeonColors.card.border,
		marginBottom: 20,
	},
	chartContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
		height: 80,
		marginBottom: 20,
	},
	barColumn: {
		alignItems: "center",
		gap: 8,
	},
	barWrapper: {
		height: 60,
		width: 24,
		justifyContent: "flex-end",
		borderRadius: 6,
		overflow: "hidden",
	},
	bar: {
		width: "100%",
		borderRadius: 6,
		position: "relative",
	},
	highlightBar: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 10,
		backgroundColor: NeonColors.accent.green,
		opacity: 0.8,
	},
	dayCircle: {
		width: 24,
		height: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	activeDayCircle: {
		borderWidth: 1,
		borderColor: NeonColors.text.secondary,
		borderRadius: 12,
	},
	dayText: {
		color: NeonColors.text.secondary,
		fontSize: 10,
		fontWeight: "600",
	},
	activeDayText: {
		color: NeonColors.text.primary,
	},
	footer: {
		alignItems: "center",
	},
	footerText: {
		color: NeonColors.text.secondary,
		fontSize: 12,
		fontWeight: "600",
		letterSpacing: 1,
	},
});
