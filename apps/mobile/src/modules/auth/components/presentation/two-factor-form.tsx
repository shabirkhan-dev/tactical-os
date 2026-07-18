import { AuthButton } from "../auth-button";
import { AuthField } from "../auth-field";

interface TwoFactorFormProps {
	code: string;
	pending: boolean;
	onCodeChange: (value: string) => void;
	onSubmit: () => void;
	onCancel: () => void;
}

export function TwoFactorForm({
	code,
	pending,
	onCodeChange,
	onSubmit,
	onCancel,
}: TwoFactorFormProps) {
	return (
		<>
			<AuthField
				label="Authentication code"
				value={code}
				onChangeText={onCodeChange}
				placeholder="123456 or recovery code"
				autoComplete="one-time-code"
				autoCapitalize="none"
				hint="Enter the code from your authenticator or a recovery code."
				editable={!pending}
			/>
			<AuthButton label="Verify and continue" onPress={onSubmit} pending={pending} />
			<AuthButton label="Back" onPress={onCancel} variant="ghost" disabled={pending} />
		</>
	);
}
