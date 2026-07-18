import { Check, ImagePlus } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { NeonColors } from "@/constants/design-system";
import { buildAvatarTemplates } from "../lib/avatar-templates";

interface AvatarPickerProps {
	seed: string;
	value: string | null | undefined;
	pending?: boolean;
	uploading?: boolean;
	onSelectTemplate: (url: string) => void;
	onPickFromDevice: () => void;
}

export function AvatarPicker({
	seed,
	value,
	pending = false,
	uploading = false,
	onSelectTemplate,
	onPickFromDevice,
}: AvatarPickerProps) {
	const templates = buildAvatarTemplates(seed);
	const busy = pending || uploading;
	const [previewFailed, setPreviewFailed] = useState(false);

	return (
		<View style={styles.wrap}>
			<Text style={styles.label}>Avatar</Text>
			<View style={styles.previewRow}>
				<View style={styles.preview}>
					{value && !previewFailed ? (
						<Image
							source={{ uri: value }}
							style={styles.previewImage}
							onError={() => setPreviewFailed(true)}
						/>
					) : (
						<Text style={styles.previewFallback}>None</Text>
					)}
				</View>
				<Pressable
					style={({ pressed }) => [
						styles.uploadButton,
						pressed && !busy && styles.pressed,
						busy && styles.disabled,
					]}
					disabled={busy}
					onPress={onPickFromDevice}
				>
					{uploading ? (
						<ActivityIndicator color={NeonColors.accent.green} />
					) : (
						<>
							<ImagePlus size={16} color={NeonColors.text.primary} strokeWidth={1.8} />
							<Text style={styles.uploadLabel}>Upload photo</Text>
						</>
					)}
				</Pressable>
			</View>

			<Text style={styles.hint}>Or pick a template</Text>
			<View style={styles.grid}>
				{templates.map((template) => {
					const selected = value === template.url;
					return (
						<Pressable
							key={template.id}
							disabled={busy}
							onPress={() => {
								setPreviewFailed(false);
								onSelectTemplate(template.url);
							}}
							style={({ pressed }) => [
								styles.template,
								selected && styles.templateSelected,
								pressed && !busy && styles.pressed,
								busy && styles.disabled,
							]}
						>
							<Image source={{ uri: template.url }} style={styles.templateImage} />
							{selected ? (
								<View style={styles.check}>
									<Check size={12} color={NeonColors.background} strokeWidth={3} />
								</View>
							) : null}
						</Pressable>
					);
				})}
			</View>
			<Text style={styles.caption}>JPEG, PNG, or WebP · max 2 MB</Text>
		</View>
	);
}

export function alertAvatarPermissionDenied() {
	Alert.alert(
		"Photo access needed",
		"Allow photo library access to upload an avatar from your device.",
	);
}

const styles = StyleSheet.create({
	wrap: {
		gap: 12,
	},
	label: {
		color: NeonColors.text.primary,
		fontSize: 14,
		fontWeight: "600",
	},
	previewRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 14,
	},
	preview: {
		width: 72,
		height: 72,
		borderRadius: 36,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: NeonColors.card.border,
		backgroundColor: NeonColors.surface,
		alignItems: "center",
		justifyContent: "center",
	},
	previewImage: {
		width: "100%",
		height: "100%",
	},
	previewFallback: {
		color: NeonColors.text.muted,
		fontSize: 12,
	},
	uploadButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		minHeight: 44,
		paddingHorizontal: 14,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: NeonColors.card.border,
		backgroundColor: "rgba(255,255,255,0.03)",
	},
	uploadLabel: {
		color: NeonColors.text.primary,
		fontSize: 14,
		fontWeight: "600",
	},
	hint: {
		color: NeonColors.text.muted,
		fontSize: 12,
		marginTop: 4,
	},
	grid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},
	template: {
		width: 64,
		height: 64,
		borderRadius: 16,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: NeonColors.card.border,
	},
	templateSelected: {
		borderColor: NeonColors.accent.green,
		borderWidth: 2,
	},
	templateImage: {
		width: "100%",
		height: "100%",
	},
	check: {
		position: "absolute",
		right: 4,
		bottom: 4,
		width: 18,
		height: 18,
		borderRadius: 9,
		backgroundColor: NeonColors.accent.green,
		alignItems: "center",
		justifyContent: "center",
	},
	caption: {
		color: NeonColors.text.muted,
		fontSize: 12,
	},
	pressed: {
		opacity: 0.85,
	},
	disabled: {
		opacity: 0.5,
	},
});
