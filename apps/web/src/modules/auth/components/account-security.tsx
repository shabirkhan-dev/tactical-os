"use client";

import { Alert, AlertDescription, AlertTitle } from "@school-os/ui/components/alert";
import { Button } from "@school-os/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@school-os/ui/components/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@school-os/ui/components/field";
import { Input } from "@school-os/ui/components/input";
import { Spinner } from "@school-os/ui/components/spinner";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import * as api from "@/lib/api-client";
import type { SessionInfo } from "@/lib/auth-types";

export function AccountSecurity() {
	const router = useRouter();
	const { token, user, loading, logoutAll } = useAuth();
	const [sessions, setSessions] = useState<SessionInfo[]>([]);
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [message, setMessage] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);

	const loadSessions = useCallback(async () => {
		if (token) {
			setSessions(await api.listSessions(token));
		}
	}, [token]);

	useEffect(() => {
		if (!loading && !user) {
			router.replace("/login");
			return;
		}
		loadSessions().catch((caught) => {
			setError(caught instanceof Error ? caught.message : "Could not load sessions");
		});
	}, [loadSessions, loading, router, user]);

	async function handlePasswordChange(event: React.FormEvent) {
		event.preventDefault();
		if (!token) return;
		setError(null);
		setMessage(null);
		setSubmitting(true);
		try {
			const result = await api.changePassword(token, { currentPassword, newPassword });
			setCurrentPassword("");
			setNewPassword("");
			setMessage(result.message);
			await loadSessions();
		} catch (caught) {
			setError(caught instanceof Error ? caught.message : "Password change failed");
		} finally {
			setSubmitting(false);
		}
	}

	async function handleRevoke(session: SessionInfo) {
		if (!token) return;
		await api.revokeSession(token, session.id);
		if (session.isCurrent) {
			await logoutAll();
			router.push("/login");
			return;
		}
		await loadSessions();
	}

	if (loading || !user) {
		return (
			<div className="flex min-h-48 items-center justify-center">
				<Spinner className="size-6" />
			</div>
		);
	}

	return (
		<div className="mx-auto grid w-full max-w-3xl gap-6 p-6">
			<div>
				<h1 className="text-2xl font-semibold">Account security</h1>
				<p className="text-muted-foreground text-sm">Manage your password and active sessions.</p>
			</div>
			{error ? (
				<Alert variant="destructive">
					<AlertTitle>Something went wrong</AlertTitle>
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			) : null}
			{message ? (
				<Alert>
					<AlertTitle>Updated</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			) : null}
			<Card>
				<CardHeader>
					<CardTitle>Change password</CardTitle>
					<CardDescription>Other sessions will be signed out after the change.</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handlePasswordChange}>
						<FieldGroup>
							<Field>
								<FieldLabel htmlFor="current-password">Current password</FieldLabel>
								<Input
									id="current-password"
									type="password"
									value={currentPassword}
									onChange={(event) => setCurrentPassword(event.target.value)}
									autoComplete="current-password"
									required
								/>
							</Field>
							<Field>
								<FieldLabel htmlFor="new-password">New password</FieldLabel>
								<Input
									id="new-password"
									type="password"
									value={newPassword}
									onChange={(event) => setNewPassword(event.target.value)}
									minLength={12}
									maxLength={128}
									autoComplete="new-password"
									required
								/>
								<FieldDescription>Use at least 12 characters.</FieldDescription>
							</Field>
							<Button type="submit" disabled={submitting}>
								{submitting ? <Spinner data-icon="inline-start" /> : null}Change password
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Active sessions</CardTitle>
					<CardDescription>Revoke devices you no longer recognize.</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-3">
					{sessions.map((session) => (
						<div
							key={session.id}
							className="flex items-center justify-between gap-4 border-b py-3 last:border-0"
						>
							<div className="min-w-0">
								<p className="truncate text-sm font-medium">
									{session.userAgent ?? "Unknown device"}
									{session.isCurrent ? " (current)" : ""}
								</p>
								<p className="text-muted-foreground text-xs">
									{session.ipAddress ?? "Unknown IP"} · Last used{" "}
									{new Date(session.lastUsedAt).toLocaleString()}
								</p>
							</div>
							<Button size="sm" variant="outline" onClick={() => handleRevoke(session)}>
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
				</CardContent>
			</Card>
		</div>
	);
}
