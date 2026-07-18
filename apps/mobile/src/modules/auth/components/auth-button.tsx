import { ActivityIndicator, Pressable, StyleSheet, Text, type ViewStyle } from "react-native";
import { NeonColors } from "@/constants/design-system";

interface AuthButtonProps {
	label: string;
	onPress: () => void;
	pending?: boolean;
	disabled?: boolean;
	variant?: "primary" | "outline" | "ghost";
	style?: ViewStyle;
}

export function AuthButton({
	label,
	onPress,
	pending = false,
	disabled = false,
	variant = "primary",
	style,
}: AuthButtonProps) {
	const isDisabled = disabled || pending;
	return (
		<Pressable
			onPress={onPress}
			disabled={isDisabled}
			style={({ pressed }) => [
				styles.base,
				variant === "primary" && styles.primary,
				variant === "outline" && styles.outline,
				variant === "ghost" && styles.ghost,
				pressed && !isDisabled && styles.pressed,
				isDisabled && styles.disabled,
				style,
			]}
		>
			{pending ? (
				<ActivityIndicator
					color={variant === "primary" ? NeonColors.background : NeonColors.accent.green}
				/>
			) : (
				<Text
					style={[
						styles.label,
						variant === "primary" && styles.primaryLabel,
						variant !== "primary" && styles.secondaryLabel,
					]}
				>
					{label}
				</Text>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	base: {
		minHeight: 48,
		borderRadius: 14,
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 16,
	},
	primary: {
		backgroundColor: NeonColors.accent.green,
	},
	outline: {
		borderWidth: 1,
		borderColor: NeonColors.card.border,
		backgroundColor: "transparent",
	},
	ghost: {
		backgroundColor: "transparent",
	},
	pressed: {
		opacity: 0.85,
	},
	disabled: {
		opacity: 0.5,
	},
	label: {
		fontSize: 16,
		fontWeight: "700",
	},
	primaryLabel: {
		color: NeonColors.background,
	},
	secondaryLabel: {
		color: NeonColors.text.primary,
	},
});
