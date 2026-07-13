"use client";

import { Alert, AlertDescription, AlertTitle } from "@school-os/ui/components/alert";
import { Button } from "@school-os/ui/components/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@school-os/ui/components/field";
import { Input } from "@school-os/ui/components/input";
import { Spinner } from "@school-os/ui/components/spinner";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { userInitials } from "@/lib/user-display";
import { useAuth } from "../context/auth-context";
import {
	useBeginTotpSetupMutation,
	useChangePasswordMutation,
	useConfirmTotpSetupMutation,
	useDeletePasskeyMutation,
	useDisableTotpMutation,
	useLinkGoogleMutation,
	useRegisterPasskeyMutation,
	useRevokeSessionMutation,
} from "../hooks/use-auth-mutations";
import { useSecurityStatusQuery, useSessionsQuery } from "../hooks/use-auth-queries";
import { GoogleIdentityButton } from "./google-identity-button";

function Panel({
	title,
	description,
	children,
}: {
	title: string;
	description: string;
	children: React.ReactNode;
}) {
	return (
		<section className="rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px]">
			<div className="rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner p-4">
				<div className="mb-4 space-y-1">
					<h2 className="font-semibold text-[15px]">{title}</h2>
					<p className="text-[13px] text-dashboard-text-muted">{description}</p>
				</div>
				{children}
			</div>
		</section>
	);
}

export function AccountSecurity() {
	const router = useRouter();
	const { user, loading, logout, logoutAll } = useAuth();
	const sessions = useSessionsQuery();
	const security = useSecurityStatusQuery();
	const changePassword = useChangePasswordMutation();
	const revoke = useRevokeSessionMutation();
	const beginTotp = useBeginTotpSetupMutation();
	const confirmTotp = useConfirmTotpSetupMutation();
	const disableTotp = useDisableTotpMutation();
	const registerPasskey = useRegisterPasskeyMutation();
	const deletePasskey = useDeletePasskeyMutation();
	const linkGoogle = useLinkGoogleMutation();
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [totpCode, setTotpCode] = useState("");
	const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
	const [passkeyName, setPasskeyName] = useState("This device");

	if (loading || !user)
		return (
			<div className="flex min-h-48 items-center justify-center">
				<Spinner className="size-6" />
			</div>
		);
	const error = [
		sessions.error,
		security.error,
		changePassword.error,
		confirmTotp.error,
		disableTotp.error,
		registerPasskey.error,
		deletePasskey.error,
		linkGoogle.error,
	].find((value) => value instanceof Error);

	return (
		<div className="mx-auto grid w-full max-w-3xl gap-4 px-3 py-4 sm:px-6 sm:py-6">
			<section className="rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px]">
				<div className="rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner p-4">
					<div className="flex items-start gap-3">
						<div className="flex size-11 items-center justify-center rounded-xl bg-zinc-800 font-semibold">
							{userInitials(user.username)}
						</div>
						<div className="min-w-0">
							<h1 className="font-semibold text-[22px]">Account security</h1>
							<p className="break-words text-[13px] text-dashboard-text-muted">
								{user.username} · {user.email}
							</p>
							<Link
								href="/admin/account/profile"
								className="text-[12px] text-dashboard-text-muted hover:underline"
							>
								View profile
							</Link>
						</div>
					</div>
				</div>
			</section>
			{error ? (
				<Alert variant="destructive">
					<AlertTitle>Something went wrong</AlertTitle>
					<AlertDescription>{error.message}</AlertDescription>
				</Alert>
			) : null}

			<Panel
				title="Two-factor authentication"
				description="Require an authenticator code after password sign-in."
			>
				{security.data?.mfa.totpEnabled ? (
					<FieldGroup>
						<p className="text-[13px]">
							Enabled · {security.data.mfa.recoveryCodesRemaining} recovery codes remaining
						</p>
						<Field>
							<FieldLabel htmlFor="disable-totp">Authenticator or recovery code</FieldLabel>
							<Input
								id="disable-totp"
								value={totpCode}
								onChange={(event) => setTotpCode(event.target.value)}
							/>
						</Field>
						<Button variant="destructive" onClick={() => disableTotp.mutate(totpCode)}>
							Disable 2FA
						</Button>
					</FieldGroup>
				) : beginTotp.data ? (
					<FieldGroup>
						<Image
							src={beginTotp.data.qrCodeDataUrl}
							alt="Authenticator QR code"
							width={208}
							height={208}
							unoptimized
							className="size-52 rounded-md bg-white p-2"
						/>
						<code className="break-all text-xs">{beginTotp.data.secret}</code>
						<Field>
							<FieldLabel htmlFor="confirm-totp">Six-digit code</FieldLabel>
							<Input
								id="confirm-totp"
								inputMode="numeric"
								autoComplete="one-time-code"
								value={totpCode}
								onChange={(event) => setTotpCode(event.target.value)}
							/>
						</Field>
						<Button
							onClick={() =>
								confirmTotp.mutate(totpCode, {
									onSuccess: (result) => setRecoveryCodes(result.recoveryCodes),
								})
							}
						>
							Confirm 2FA
						</Button>
					</FieldGroup>
				) : (
					<Button onClick={() => beginTotp.mutate()}>Set up authenticator</Button>
				)}
				{recoveryCodes.length > 0 ? (
					<Alert>
						<AlertTitle>Save these recovery codes now</AlertTitle>
						<AlertDescription>
							<div className="mt-2 grid grid-cols-1 gap-2 font-mono text-xs sm:grid-cols-2">
								{recoveryCodes.map((code) => (
									<span key={code}>{code}</span>
								))}
							</div>
						</AlertDescription>
					</Alert>
				) : null}
			</Panel>

			<Panel
				title="Passkeys"
				description="Use fingerprint, face recognition, device PIN, or a security key."
			>
				<div className="grid gap-3">
					{security.data?.passkeys.map((passkey) => (
						<div
							key={passkey.id}
							className="flex flex-wrap items-center justify-between gap-2 border-dashboard-border-subtle border-b py-2"
						>
							<div>
								<p className="text-[13px] font-medium">{passkey.name}</p>
								<p className="text-[12px] text-dashboard-text-muted">
									{passkey.deviceType}
									{passkey.backedUp ? " · synced" : ""}
								</p>
							</div>
							<Button size="sm" variant="outline" onClick={() => deletePasskey.mutate(passkey.id)}>
								Remove
							</Button>
						</div>
					))}
					<div className="flex flex-col gap-2 sm:flex-row">
						<Input
							value={passkeyName}
							onChange={(event) => setPasskeyName(event.target.value)}
							aria-label="Passkey name"
						/>
						<Button onClick={() => registerPasskey.mutate(passkeyName)}>Add passkey</Button>
					</div>
				</div>
			</Panel>

			<Panel title="Connected accounts" description="Use a verified provider as a sign-in method.">
				{security.data?.social.googleLinked ? (
					<p className="text-[13px]">Google is connected.</p>
				) : (
					<GoogleIdentityButton
						onCredential={(credential) => linkGoogle.mutate(credential)}
						disabled={linkGoogle.isPending}
					/>
				)}
			</Panel>

			{user.hasPassword ? (
				<Panel
					title="Change password"
					description="Other sessions are revoked after a password change."
				>
					<form
						onSubmit={(event) => {
							event.preventDefault();
							changePassword.mutate(
								{ currentPassword, newPassword },
								{
									onSuccess: () => {
										setCurrentPassword("");
										setNewPassword("");
									},
								},
							);
						}}
					>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="current-password">Current password</FieldLabel>
								<Input
									id="current-password"
									type="password"
									autoComplete="current-password"
									value={currentPassword}
									onChange={(event) => setCurrentPassword(event.target.value)}
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="new-password">New password</FieldLabel>
								<Input
									id="new-password"
									type="password"
									autoComplete="new-password"
									minLength={12}
									value={newPassword}
									onChange={(event) => setNewPassword(event.target.value)}
									required
								/>
								<FieldDescription>Use at least 12 characters.</FieldDescription>
							</Field>
							<Button type="submit" disabled={changePassword.isPending}>
								Change password
							</Button>
						</FieldGroup>
					</form>
				</Panel>
			) : null}

			<Panel title="Active sessions" description="Revoke devices you no longer recognize.">
				<div className="grid gap-3">
					{sessions.data?.map((session) => (
						<div
							key={session.id}
							className="flex flex-col items-stretch justify-between gap-2 border-dashboard-border-subtle border-b py-2 sm:flex-row sm:items-center"
						>
							<div className="min-w-0">
								<p className="truncate text-[13px]">
									{session.userAgent ?? "Unknown device"}
									{session.isCurrent ? " (current)" : ""}
								</p>
								<p className="text-[12px] text-dashboard-text-muted">
									{session.ipAddress ?? "Unknown IP"} ·{" "}
									{new Date(session.lastUsedAt).toLocaleString()}
								</p>
							</div>
							<Button
								size="sm"
								variant="outline"
								onClick={() =>
									revoke.mutate(session.id, {
										onSuccess: async () => {
											if (session.isCurrent) {
												await logout();
												router.push("/login");
											}
										},
									})
								}
							>
								Revoke
							</Button>
						</div>
					))}
					<Button
						variant="destructive"
						onClick={async () => {
							await logoutAll();
							router.push("/login");
						}}
					>
						Sign out everywhere
					</Button>
				</div>
			</Panel>
		</div>
	);
}
