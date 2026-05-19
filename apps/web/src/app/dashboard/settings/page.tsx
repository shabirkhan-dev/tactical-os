"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { getApiDisplayName } from "@/components/api-switcher";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context";
import type { SessionInfo } from "@/lib/api-client";
import * as api from "@/lib/api-client";

function formatDate(iso: string): string {
	return new Date(iso).toLocaleString();
}

function truncateId(id: string, len = 8): string {
	if (id.length <= len) return id;
	return `${id.slice(0, len)}…`;
}

export default function SettingsPage() {
	const { api: apiKind, user, refreshUser } = useAuth();
	const router = useRouter();
	const baseUrl = api.getBaseUrl("hono");
	const isHono = apiKind === "hono";

	// Sessions
	const [sessions, setSessions] = useState<SessionInfo[]>([]);
	const [sessionsLoading, setSessionsLoading] = useState(false);
	const [sessionsError, setSessionsError] = useState<string | null>(null);
	const [deletingId, setDeletingId] = useState<string | null>(null);

	const loadSessions = useCallback(async () => {
		if (!isHono) return;
		setSessionsLoading(true);
		setSessionsError(null);
		try {
			const { sessions: list } = await api.getSessions(baseUrl);
			setSessions(list);
		} catch (e) {
			setSessionsError(e instanceof Error ? e.message : "Failed to load sessions");
		} finally {
			setSessionsLoading(false);
		}
	}, [baseUrl, isHono]);

	useEffect(() => {
		if (isHono) loadSessions();
	}, [isHono, loadSessions]);

	const handleDeleteSession = async (sessionId: string, isCurrent: boolean) => {
		if (!isHono) return;
		setDeletingId(sessionId);
		try {
			await api.deleteSession(baseUrl, sessionId);
			if (isCurrent) {
				await api.logoutHono(baseUrl);
				router.replace("/login");
				return;
			}
			await loadSessions();
		} catch (e) {
			setSessionsError(e instanceof Error ? e.message : "Failed to delete session");
		} finally {
			setDeletingId(null);
		}
	};

	// 2FA
	const [twoFaStep, setTwoFaStep] = useState<"idle" | "setup" | "enable">("idle");
	const [twoFaDataUrl, setTwoFaDataUrl] = useState<string | null>(null);
	const [twoFaSecret, setTwoFaSecret] = useState<string | null>(null);
	const [twoFaCode, setTwoFaCode] = useState("");
	const [disablePassword, setDisablePassword] = useState("");
	const [twoFaError, setTwoFaError] = useState<string | null>(null);
	const [twoFaLoading, setTwoFaLoading] = useState(false);

	const handleStartSetup = async () => {
		if (!isHono) return;
		setTwoFaError(null);
		setTwoFaLoading(true);
		try {
			const { secret, dataUrl } = await api.setup2FA(baseUrl);
			setTwoFaDataUrl(dataUrl);
			setTwoFaSecret(secret);
			setTwoFaStep("setup");
		} catch (e) {
			setTwoFaError(e instanceof Error ? e.message : "Failed to setup 2FA");
		} finally {
			setTwoFaLoading(false);
		}
	};

	const handleEnable2FA = async () => {
		if (!isHono || twoFaCode.length !== 6) return;
		setTwoFaError(null);
		setTwoFaLoading(true);
		try {
			await api.enable2FA(baseUrl, twoFaCode);
			await refreshUser();
			setTwoFaStep("idle");
			setTwoFaDataUrl(null);
			setTwoFaSecret(null);
			setTwoFaCode("");
		} catch (e) {
			setTwoFaError(e instanceof Error ? e.message : "Invalid code");
		} finally {
			setTwoFaLoading(false);
		}
	};

	const handleDisable2FA = async () => {
		if (!isHono || !disablePassword.trim()) return;
		setTwoFaError(null);
		setTwoFaLoading(true);
		try {
			await api.disable2FA(baseUrl, disablePassword);
			await refreshUser();
			setDisablePassword("");
		} catch (e) {
			setTwoFaError(e instanceof Error ? e.message : "Failed to disable 2FA");
		} finally {
			setTwoFaLoading(false);
		}
	};

	const cancelSetup = () => {
		setTwoFaStep("idle");
		setTwoFaDataUrl(null);
		setTwoFaSecret(null);
		setTwoFaCode("");
		setTwoFaError(null);
	};

	const twoFaEnabled = user?.enable2FA === true;

	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<div className="px-4 lg:px-6">
				<h1 className="text-2xl font-semibold">Settings</h1>
				<p className="text-muted-foreground text-sm">
					Account and security options · {getApiDisplayName(apiKind)}
				</p>
			</div>

			{/* Sessions (Hono only) */}
			{isHono && (
				<div className="px-4 lg:px-6">
					<Card className="max-w-3xl">
						<CardHeader>
							<CardTitle>Sessions</CardTitle>
							<CardDescription>
								View and revoke active sessions. Revoking the current session will log you out.
							</CardDescription>
						</CardHeader>
						<CardContent>
							{sessionsError && <p className="text-destructive text-sm">{sessionsError}</p>}
							{sessionsLoading && (
								<p className="text-muted-foreground text-sm">Loading sessions…</p>
							)}
							{!sessionsLoading && sessions.length === 0 && !sessionsError && (
								<p className="text-muted-foreground text-sm">No sessions found.</p>
							)}
							{!sessionsLoading && sessions.length > 0 && (
								<ul className="divide-y divide-border">
									{sessions.map((s) => (
										<li
											key={s.id}
											className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0"
										>
											<div className="min-w-0 flex-1">
												<div className="flex flex-wrap items-center gap-2">
													<span className="font-mono text-xs text-muted-foreground">
														{truncateId(s.id)}
													</span>
													{s.current && (
														<Badge variant="secondary" className="text-xs">
															Current device
														</Badge>
													)}
												</div>
												<p className="text-muted-foreground text-sm">
													{s.userAgent ?? "Unknown device"}
												</p>
												<p className="text-muted-foreground text-xs">
													Created {formatDate(s.createdAt)} · Expires {formatDate(s.expiredAt)}
												</p>
											</div>
											<Button
												variant="destructive"
												size="sm"
												disabled={deletingId === s.id}
												onClick={() => handleDeleteSession(s.id, s.current)}
											>
												{deletingId === s.id ? "Revoking…" : "Revoke"}
											</Button>
										</li>
									))}
								</ul>
							)}
						</CardContent>
						<CardFooter className="border-t pt-4">
							<Button variant="outline" size="sm" onClick={loadSessions} disabled={sessionsLoading}>
								Refresh list
							</Button>
						</CardFooter>
					</Card>
				</div>
			)}

			{/* Two-factor (Hono only) */}
			{isHono && (
				<div className="px-4 lg:px-6">
					<Card className="max-w-3xl">
						<CardHeader>
							<CardTitle>Two-factor authentication</CardTitle>
							<CardDescription>
								{twoFaEnabled
									? "2FA is enabled. You can disable it by entering your password."
									: "Add an extra layer of security with an authenticator app."}
							</CardDescription>
						</CardHeader>
						<CardContent>
							{twoFaError && <p className="text-destructive text-sm mb-4">{twoFaError}</p>}

							{twoFaEnabled ? (
								<FieldGroup>
									<Field>
										<FieldLabel>Disable 2FA</FieldLabel>
										<FieldDescription>
											Enter your account password to turn off two-factor authentication.
										</FieldDescription>
										<Input
											type="password"
											placeholder="Password"
											value={disablePassword}
											onChange={(e) => setDisablePassword(e.target.value)}
											disabled={twoFaLoading}
											className="max-w-xs mt-2"
										/>
									</Field>
									<Button
										variant="destructive"
										onClick={handleDisable2FA}
										disabled={!disablePassword.trim() || twoFaLoading}
									>
										{twoFaLoading ? "Disabling…" : "Disable 2FA"}
									</Button>
								</FieldGroup>
							) : twoFaStep === "setup" ? (
								<FieldGroup>
									<p className="text-muted-foreground text-sm">
										Scan the QR code with your authenticator app (e.g. Google Authenticator, Authy),
										then enter the 6-digit code below.
									</p>
									{twoFaDataUrl && (
										<div className="flex flex-col gap-2">
											<Image
												src={twoFaDataUrl}
												alt="2FA QR code"
												width={160}
												height={160}
												unoptimized
												className="rounded border border-border"
											/>
											{twoFaSecret && (
												<p className="font-mono text-muted-foreground text-xs break-all">
													Secret: {twoFaSecret}
												</p>
											)}
										</div>
									)}
									<Field>
										<FieldLabel>Verification code</FieldLabel>
										<Input
											type="text"
											inputMode="numeric"
											autoComplete="one-time-code"
											placeholder="000000"
											maxLength={6}
											value={twoFaCode}
											onChange={(e) => setTwoFaCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
											disabled={twoFaLoading}
											className="max-w-32 mt-2"
										/>
									</Field>
									<div className="flex gap-2">
										<Button
											onClick={handleEnable2FA}
											disabled={twoFaCode.length !== 6 || twoFaLoading}
										>
											{twoFaLoading ? "Verifying…" : "Enable 2FA"}
										</Button>
										<Button variant="outline" onClick={cancelSetup} disabled={twoFaLoading}>
											Cancel
										</Button>
									</div>
								</FieldGroup>
							) : (
								<Button onClick={handleStartSetup} disabled={twoFaLoading}>
									{twoFaLoading ? "Starting…" : "Add 2FA"}
								</Button>
							)}
						</CardContent>
					</Card>
				</div>
			)}

			{!isHono && (
				<div className="px-4 lg:px-6">
					<Card className="max-w-3xl">
						<CardHeader>
							<CardTitle>Sessions & 2FA</CardTitle>
							<CardDescription>
								Session management and two-factor authentication are available when using the{" "}
								{getApiDisplayName("hono")} API. Switch API in the header to access these settings.
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			)}
		</div>
	);
}
