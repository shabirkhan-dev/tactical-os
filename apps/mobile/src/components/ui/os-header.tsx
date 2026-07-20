import { type Href, router, useSegments } from "expo-router";
import { Bell, Check, ChevronDown, Scan } from "lucide-react-native";
import * as React from "react";
import {
	Image,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { NeonColors } from "@/constants/design-system";
import { resolveMediaUrl } from "@/lib/media-url";
import { useAuth } from "@/modules/auth";

export type OSModuleKey =
	| "dashboard"
	| "profile"
	| "focus"
	| "library"
	| "gear"
	| "drills"
	| "logistics"
	| "loadout"
	| "debrief";

const MODULE_LABELS: Record<OSModuleKey, string> = {
	dashboard: "Ops Console",
	profile: "Operator",
	focus: "Missions",
	library: "Academy",
	gear: "Gear",
	drills: "Drills",
	logistics: "Logistics",
	loadout: "Loadout",
	debrief: "Debrief",
};

const MODULES: { key: OSModuleKey; route: Href }[] = [
	{ key: "dashboard", route: "/(modules)/(dashboard)" },
	{ key: "drills", route: "/(modules)/(exercise)" },
	{ key: "library", route: "/(modules)/(library)" },
	{ key: "focus", route: "/(modules)/(focus)" },
	{ key: "gear", route: "/(modules)/(skincare)" },
	{ key: "loadout", route: "/(modules)/(nutrition)" },
	{ key: "debrief", route: "/(modules)/(mindfulness)" },
	{ key: "logistics", route: "/(modules)/(expenses)" },
	{ key: "profile", route: "/(modules)/(profile)" as Href },
];

function resolveModuleKey(segments: string[]): OSModuleKey {
	if (segments.includes("(profile)")) return "profile";
	if (segments.includes("(skincare)")) return "gear";
	if (segments.includes("(exercise)")) return "drills";
	if (segments.includes("(expenses)")) return "logistics";
	if (segments.includes("(nutrition)")) return "loadout";
	if (segments.includes("(mindfulness)")) return "debrief";
	if (segments.includes("(focus)")) return "focus";
	if (segments.includes("(library)")) return "library";
	return "dashboard";
}

export function OSHeader() {
	const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
	const segments = useSegments() as string[];
	const { user } = useAuth();

	const avatarUri =
		resolveMediaUrl(user?.profile?.avatarUrl?.trim()) ||
		(user
			? `https://avatar.vercel.sh/${encodeURIComponent(user.username)}`
			: "https://avatar.vercel.sh/guest");

	const handleAvatarPress = () => {
		router.replace("/(modules)/(profile)" as Href);
	};

	const currentModuleKey = React.useMemo(() => resolveModuleKey(segments), [segments]);
	const currentModuleLabel = MODULE_LABELS[currentModuleKey];

	const handleSelect = (route: Href) => {
		router.replace(route);
		setIsDropdownOpen(false);
	};

	return (
		<View style={styles.container}>
			<View style={styles.left}>
				<Pressable style={styles.avatarContainer} onPress={handleAvatarPress}>
					<Image source={{ uri: avatarUri }} style={styles.avatar} />
					<View style={styles.onlineDot} />
				</Pressable>

				<View style={styles.dropdownContainer}>
					<Pressable style={styles.accountSelector} onPress={() => setIsDropdownOpen(true)}>
						<Text style={styles.accountName}>{currentModuleLabel}</Text>
						<ChevronDown size={16} color={NeonColors.text.secondary} />
					</Pressable>

					<Modal
						visible={isDropdownOpen}
						transparent={true}
						animationType="fade"
						onRequestClose={() => setIsDropdownOpen(false)}
					>
						<TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
							<View style={styles.modalOverlay}>
								<View style={styles.dropdownMenu}>
									{MODULES.map((mod) => (
										<Pressable
											key={mod.key}
											style={styles.dropdownItem}
											onPress={() => handleSelect(mod.route)}
										>
											<Text
												style={[
													styles.dropdownItemText,
													currentModuleKey === mod.key && styles.activeDropdownItemText,
												]}
											>
												{MODULE_LABELS[mod.key]}
											</Text>
											{currentModuleKey === mod.key && (
												<Check size={16} color={NeonColors.accent.green} strokeWidth={3} />
											)}
										</Pressable>
									))}
								</View>
							</View>
						</TouchableWithoutFeedback>
					</Modal>
				</View>
			</View>

			<View style={styles.right}>
				<Pressable style={styles.iconButton}>
					<Scan size={22} color={NeonColors.text.primary} strokeWidth={1.5} />
				</Pressable>
				<View style={styles.notificationContainer}>
					<Pressable style={styles.iconButton}>
						<Bell size={22} color={NeonColors.text.primary} strokeWidth={1.5} />
					</Pressable>
					<View style={styles.badge} />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		zIndex: 100,
	},
	left: {
		flexDirection: "row",
		alignItems: "center",
		gap: 12,
	},
	avatarContainer: {
		position: "relative",
	},
	avatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: NeonColors.surface,
	},
	onlineDot: {
		position: "absolute",
		bottom: 0,
		right: 0,
		width: 10,
		height: 10,
		borderRadius: 5,
		backgroundColor: NeonColors.accent.green,
		borderWidth: 2,
		borderColor: NeonColors.background,
	},
	dropdownContainer: {
		position: "relative",
	},
	accountSelector: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		backgroundColor: NeonColors.surface,
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: "rgba(196, 214, 140, 0.08)",
	},
	accountName: {
		color: NeonColors.text.primary,
		fontSize: 14,
		fontWeight: "700",
		letterSpacing: 0.5,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		justifyContent: "flex-start",
		paddingTop: 60,
		paddingLeft: 64,
	},
	dropdownMenu: {
		width: 200,
		backgroundColor: NeonColors.surface,
		borderRadius: 16,
		padding: 8,
		borderWidth: 1,
		borderColor: "rgba(196, 214, 140, 0.12)",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 10 },
		shadowOpacity: 0.5,
		shadowRadius: 20,
		elevation: 10,
	},
	dropdownItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 8,
	},
	dropdownItemText: {
		color: NeonColors.text.secondary,
		fontSize: 15,
		fontWeight: "500",
	},
	activeDropdownItemText: {
		color: NeonColors.text.primary,
		fontWeight: "700",
	},
	right: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	iconButton: {
		padding: 4,
	},
	notificationContainer: {
		position: "relative",
	},
	badge: {
		position: "absolute",
		top: 4,
		right: 4,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: NeonColors.accent.amber,
		borderWidth: 1.5,
		borderColor: NeonColors.background,
	},
});
