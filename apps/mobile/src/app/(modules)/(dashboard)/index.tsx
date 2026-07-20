import { CheckCircle2, Clock, Crosshair, Target, Timer, TrendingUp } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { LogListItem } from "@/components/ui/log-list-item";
import { OSHeader } from "@/components/ui/os-header";
import { QuickAction } from "@/components/ui/quick-action";
import { HeartRateWidget } from "@/components/widgets/heart-rate-widget";
import { MindfulnessWidget } from "@/components/widgets/mindfulness-widget";
import { NutritionWidget } from "@/components/widgets/nutrition-widget";
import { RecorderWidget } from "@/components/widgets/recorder-widget";
import { SpendingWidget } from "@/components/widgets/spending-widget";
import { WaterWidget } from "@/components/widgets/water-widget";
import { NeonColors } from "@/constants/design-system";

export default function DashboardIndex() {
	return (
		<View style={styles.container}>
			<SafeAreaView edges={["top"]} style={styles.safeArea}>
				<OSHeader />

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}
				>
					<View style={styles.statusSection}>
						<Text style={styles.statusLabel}>OPERATOR READINESS</Text>
						<View style={styles.scoreRow}>
							<Text style={styles.score}>
								94.2<Text style={styles.scorePercent}>%</Text>
							</Text>
							<View style={styles.trendBadge}>
								<TrendingUp size={12} color={NeonColors.accent.green} />
								<Text style={styles.trendText}>+2.4%</Text>
							</View>
						</View>
					</View>

					<View style={styles.quickActionsRow}>
						<QuickAction icon={Timer} label="Start Drill" />
						<QuickAction icon={Crosshair} label="Log Score" />
						<QuickAction icon={Clock} label="Par Timer" />
						<QuickAction icon={Target} label="Weapons" />
					</View>

					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>LIVE METRICS</Text>
					</View>

					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.carouselContent}
						snapToAlignment="center"
						decelerationRate="fast"
					>
						<View style={styles.widgetWrapper}>
							<WaterWidget />
						</View>
						<View style={styles.widgetWrapper}>
							<HeartRateWidget />
						</View>
						<View style={styles.widgetWrapper}>
							<SpendingWidget />
						</View>
						<View style={styles.widgetWrapper}>
							<RecorderWidget />
						</View>
						<View style={styles.widgetWrapper}>
							<NutritionWidget />
						</View>
						<View style={styles.widgetWrapper}>
							<MindfulnessWidget />
						</View>
					</ScrollView>

					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>RECENT DRILLS</Text>
					</View>

					<View style={styles.logsList}>
						<LogListItem
							icon={CheckCircle2}
							iconColor={NeonColors.accent.green}
							title="Bill Drill — Stage 3"
							subtitle="Draw to first shot • 1.42s"
							value="A-Zone"
							delta="2 min ago"
							deltaColor={NeonColors.text.secondary}
						/>
						<LogListItem
							icon={Target}
							iconColor={NeonColors.accent.amber}
							title="El Presidente"
							subtitle="6 targets • 8.12s par"
							value="PASS"
							delta="Today 09:14"
							deltaColor={NeonColors.accent.green}
						/>
					</View>
				</ScrollView>
			</SafeAreaView>
			<FloatingActionButton color={NeonColors.accent.green} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: NeonColors.background,
	},
	safeArea: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 40,
	},
	statusSection: {
		paddingHorizontal: 16,
		marginTop: 12,
		marginBottom: 20,
	},
	statusLabel: {
		color: NeonColors.text.secondary,
		fontSize: 12,
		fontWeight: "700",
		letterSpacing: 1.5,
		marginBottom: 4,
	},
	scoreRow: {
		flexDirection: "row",
		alignItems: "baseline",
		gap: 12,
	},
	score: {
		color: NeonColors.text.primary,
		fontSize: 48,
		fontWeight: "300",
	},
	scorePercent: {
		fontSize: 24,
		color: NeonColors.text.secondary,
	},
	trendBadge: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: "rgba(163, 196, 74, 0.15)",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
	},
	trendText: {
		color: NeonColors.accent.green,
		fontSize: 12,
		fontWeight: "700",
	},
	quickActionsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		marginBottom: 32,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		marginBottom: 16,
	},
	sectionTitle: {
		color: NeonColors.text.primary,
		fontSize: 14,
		fontWeight: "700",
		letterSpacing: 1,
	},
	carouselContent: {
		paddingLeft: 16,
		paddingRight: 16,
		gap: 12,
		marginBottom: 32,
	},
	widgetWrapper: {
		width: 320,
	},
	logsList: {
		paddingHorizontal: 16,
		marginTop: 12,
		gap: 8,
	},
});
