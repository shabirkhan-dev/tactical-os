import { CheckCircle2, Info } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { LogListItem } from "@/components/ui/log-list-item";
import { OSHeader } from "@/components/ui/os-header";
import { NutritionWidget } from "@/components/widgets/nutrition-widget";
import { NeonColors } from "@/constants/design-system";

export default function NutritionIndex() {
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
							<Text style={styles.viewTitle}>Loadout</Text>
							<Text style={styles.viewSubtitle}>Range bag, mags, and kit checklist.</Text>
						</View>
						<NutritionWidget />
						<View style={styles.logsList}>
							<LogListItem
								icon={CheckCircle2}
								iconColor={NeonColors.accent.green}
								title="Pistol mags loaded"
								subtitle="3 mags • 51 rounds total"
								value="80%"
								delta="On track"
								deltaColor={NeonColors.text.secondary}
							/>
							<LogListItem
								icon={Info}
								iconColor={NeonColors.accent.yellow}
								title="Fasting Window"
								subtitle="Intermittent Fasting (16:8)"
								value="Active"
								delta="4h left"
								deltaColor={NeonColors.text.secondary}
							/>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
			<FloatingActionButton color={NeonColors.accent.yellow} />
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
	},
});
