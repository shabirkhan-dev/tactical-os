"use client";

import {
	AlertCircleIcon,
	Mail01Icon,
	ViewIcon,
	ViewOffSlashIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
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
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@school-os/ui/components/input-group";
import { Spinner } from "@school-os/ui/components/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
	const router = useRouter();
	const { user, loading, error, clearError, login } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		if (!loading && user) {
			router.replace("/admin");
		}
	}, [loading, router, user]);

	if (loading || user) {
		return (
			<div className="flex min-h-48 items-center justify-center" aria-busy="true">
				<Spinner className="size-6 text-muted-foreground" />
			</div>
		);
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		clearError();
		setSubmitting(true);
		try {
			await login({ email, password });
			router.push("/admin");
		} catch {
			// error set in context
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<p className="text-muted-foreground text-sm font-medium tracking-wide">Starter</p>
					<CardTitle className="text-2xl">Welcome back</CardTitle>
					<CardDescription>Sign in to continue to your workspace</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<FieldGroup>
							{error ? (
								<Alert variant="destructive">
									<HugeiconsIcon icon={AlertCircleIcon} strokeWidth={2} />
									<AlertTitle>Could not sign in</AlertTitle>
									<AlertDescription>{error}</AlertDescription>
								</Alert>
							) : null}

							<Field>
								<FieldLabel htmlFor="email">Email</FieldLabel>
								<InputGroup>
									<InputGroupAddon>
										<HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
									</InputGroupAddon>
									<InputGroupInput
										id="email"
										type="email"
										placeholder="you@school.edu"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										autoComplete="email"
										disabled={submitting}
									/>
								</InputGroup>
							</Field>

							<Field>
								<div className="flex items-center justify-between gap-2">
									<FieldLabel htmlFor="password">Password</FieldLabel>
									<Link
										href="/forgot-password"
										className="text-muted-foreground text-sm underline-offset-4 hover:underline"
									>
										Forgot password?
									</Link>
								</div>
								<InputGroup>
									<InputGroupInput
										id="password"
										type={showPassword ? "text" : "password"}
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										autoComplete="current-password"
										disabled={submitting}
									/>
									<InputGroupAddon align="inline-end">
										<InputGroupButton
											size="icon-xs"
											aria-label={showPassword ? "Hide password" : "Show password"}
											onClick={() => setShowPassword((prev) => !prev)}
										>
											<HugeiconsIcon
												icon={showPassword ? ViewOffSlashIcon : ViewIcon}
												strokeWidth={2}
											/>
										</InputGroupButton>
									</InputGroupAddon>
								</InputGroup>
							</Field>

							<Field>
								<Button type="submit" className="w-full" disabled={submitting}>
									{submitting ? <Spinner data-icon="inline-start" /> : null}
									{submitting ? "Signing in…" : "Sign in"}
								</Button>
							</Field>

							<FieldDescription className="text-center">
								Don&apos;t have an account?{" "}
								<Link href="/register" className="text-primary underline underline-offset-4">
									Create one
								</Link>
							</FieldDescription>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
			<FieldDescription className="px-6 text-center">
				By continuing, you agree to our Terms of Service and Privacy Policy.
			</FieldDescription>
		</div>
	);
}
