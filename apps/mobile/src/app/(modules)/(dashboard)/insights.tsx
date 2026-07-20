import { BarChart3, Crosshair, Timer } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogListItem } from "@/components/ui/log-list-item";
import { OSHeader } from "@/components/ui/os-header";
import { NeonColors } from "@/constants/design-system";

export default function InsightsScreen() {
	return (
		<View style={styles.container}>
			<SafeAreaView edges={["top"]} style={styles.safeArea}>
				<OSHeader />

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={styles.scrollContent}
				>
					<View style={styles.viewContainer}>
						<View style={styles.viewHeader}>
							<Text style={styles.viewTitle}>Analytics</Text>
							<Text style={styles.viewSubtitle}>
								Performance trends across drills, splits, and qualification scores.
							</Text>
						</View>

						<View style={styles.logsList}>
							<LogListItem
								icon={BarChart3}
								iconColor={NeonColors.accent.green}
								title="Weekly Volume"
								subtitle="Drill sessions logged this week"
								value="+12%"
								delta="vs last week"
								deltaColor={NeonColors.text.secondary}
							/>
							<LogListItem
								icon={Timer}
								iconColor={NeonColors.accent.amber}
								title="Best Split"
								subtitle="Draw to first shot — Bill Drill"
								value="1.38s"
								delta="PR"
								deltaColor={NeonColors.accent.green}
							/>
							<LogListItem
								icon={Crosshair}
								iconColor={NeonColors.accent.blue}
								title="Hit Factor"
								subtitle="Accuracy under time pressure"
								value="92%"
								delta="+4%"
								deltaColor={NeonColors.accent.green}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
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
	viewContainer: {
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	viewHeader: {
		marginBottom: 24,
	},
	viewTitle: {
		color: NeonColors.text.primary,
		fontSize: 32,
		fontWeight: "300",
	},
	viewSubtitle: {
		color: NeonColors.text.secondary,
		fontSize: 14,
		marginTop: 4,
	},
	logsList: {
		marginTop: 12,
		gap: 8,
	},
});
