import { StyleSheet, Text, View } from "react-native";
import { NeonColors } from "@/constants/design-system";

interface AuthAlertProps {
	title?: string;
	message: string;
	variant?: "destructive" | "info";
}

export function AuthAlert({ title, message, variant = "info" }: AuthAlertProps) {
	const destructive = variant === "destructive";
	return (
		<View style={[styles.box, destructive ? styles.destructive : styles.info]}>
			{title ? (
				<Text style={[styles.title, destructive && styles.destructiveText]}>{title}</Text>
			) : null}
			<Text style={[styles.message, destructive && styles.destructiveText]}>{message}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	box: {
		borderRadius: 12,
		borderWidth: 1,
		padding: 12,
		gap: 4,
	},
	info: {
		borderColor: "rgba(0, 230, 118, 0.35)",
		backgroundColor: "rgba(0, 230, 118, 0.08)",
	},
	destructive: {
		borderColor: "rgba(255, 23, 68, 0.4)",
		backgroundColor: "rgba(255, 23, 68, 0.1)",
	},
	title: {
		color: NeonColors.text.primary,
		fontWeight: "700",
		fontSize: 14,
	},
	message: {
		color: NeonColors.text.secondary,
		fontSize: 13,
		lineHeight: 18,
	},
	destructiveText: {
		color: "#FF8A9A",
	},
});
