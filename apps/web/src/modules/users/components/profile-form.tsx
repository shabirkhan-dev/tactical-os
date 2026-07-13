import { Button } from "@school-os/ui/components/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@school-os/ui/components/field";
import { Input } from "@school-os/ui/components/input";
import { Spinner } from "@school-os/ui/components/spinner";
import type { UpdateUserProfileInput } from "../types/user.types";

export function ProfileForm({
	value,
	pending,
	onChange,
	onSubmit,
}: {
	value: UpdateUserProfileInput;
	pending: boolean;
	onChange: (value: UpdateUserProfileInput) => void;
	onSubmit: (event: React.FormEvent) => void;
}) {
	return (
		<form onSubmit={onSubmit}>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor="profile-username">Username</FieldLabel>
					<Input
						id="profile-username"
						value={value.username ?? ""}
						onChange={(event) => onChange({ ...value, username: event.target.value })}
						minLength={3}
						maxLength={64}
						autoComplete="username"
						required
					/>
					<FieldDescription>Unique account handle.</FieldDescription>
				</Field>
				<Field>
					<FieldLabel htmlFor="profile-name">Display name</FieldLabel>
					<Input
						id="profile-name"
						value={value.displayName ?? ""}
						onChange={(event) => onChange({ ...value, displayName: event.target.value || null })}
						maxLength={100}
						autoComplete="name"
					/>
				</Field>
				<Field>
					<FieldLabel htmlFor="profile-avatar">Avatar URL</FieldLabel>
					<Input
						id="profile-avatar"
						type="url"
						value={value.avatarUrl ?? ""}
						onChange={(event) => onChange({ ...value, avatarUrl: event.target.value || null })}
						maxLength={2048}
					/>
				</Field>
				<Field>
					<FieldLabel htmlFor="profile-bio">Bio</FieldLabel>
					<Input
						id="profile-bio"
						value={value.bio ?? ""}
						onChange={(event) => onChange({ ...value, bio: event.target.value || null })}
						maxLength={280}
					/>
				</Field>
				<div className="grid gap-4 sm:grid-cols-2">
					<Field>
						<FieldLabel htmlFor="profile-timezone">Timezone</FieldLabel>
						<Input
							id="profile-timezone"
							value={value.timezone ?? ""}
							onChange={(event) => onChange({ ...value, timezone: event.target.value || null })}
							placeholder="America/Los_Angeles"
							maxLength={64}
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="profile-locale">Locale</FieldLabel>
						<Input
							id="profile-locale"
							value={value.locale ?? ""}
							onChange={(event) => onChange({ ...value, locale: event.target.value || null })}
							placeholder="en-US"
							maxLength={16}
						/>
					</Field>
				</div>
				<Button type="submit" disabled={pending}>
					{pending ? <Spinner data-icon="inline-start" /> : null}Save changes
				</Button>
			</FieldGroup>
		</form>
	);
}
