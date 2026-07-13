"use client";

import { Button } from "@school-os/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@school-os/ui/components/card";
import { useAuth } from "@/context/auth-context";
import type { ApiKind } from "@/lib/auth-types";
import { cn } from "@/lib/utils";

const API_OPTIONS: { kind: ApiKind; label: string; port: string; description: string }[] = [
	{ kind: "python", label: "Python", port: "8000", description: "FastAPI" },
	{ kind: "rust", label: "Rust", port: "8001", description: "Axum" },
	{ kind: "hono", label: "Hono", port: "8080", description: "TypeScript" },
];

export function getApiDisplayName(api: ApiKind): string {
	const opt = API_OPTIONS.find((o) => o.kind === api);
	return opt ? `${opt.label} (${opt.description})` : api;
}

export function ApiSwitcher() {
	const { api, setApi } = useAuth();

	return (
		<Card className="w-full">
			<CardHeader className="pb-2">
				<CardTitle className="text-base">Backend API</CardTitle>
				<CardDescription>Choose which API handles auth and data.</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				<fieldset className="flex flex-wrap gap-2 border-0 p-0" aria-label="Backend API">
					{API_OPTIONS.map((opt) => (
						<Button
							key={opt.kind}
							type="button"
							variant={api === opt.kind ? "secondary" : "outline"}
							size="sm"
							onClick={() => setApi(opt.kind)}
							className={cn(
								"min-w-28 justify-between gap-2 font-medium transition-colors",
								api === opt.kind && "ring-2 ring-primary ring-offset-2 ring-offset-background",
							)}
							aria-pressed={api === opt.kind}
							aria-label={`Use ${opt.label} (${opt.description}) on port ${opt.port}`}
						>
							<span className="flex flex-col items-start text-left">
								<span>{opt.label}</span>
								<span className="text-muted-foreground text-xs font-normal">
									{opt.description} · :{opt.port}
								</span>
							</span>
							{api === opt.kind && (
								<span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />
							)}
						</Button>
					))}
				</fieldset>
			</CardContent>
		</Card>
	);
}

/** Compact dropdown for header/tight spaces (e.g. login/register top-right). */
export function ApiSwitcherCompact() {
	const { api, setApi } = useAuth();
	const current = API_OPTIONS.find((o) => o.kind === api);

	return (
		<div className="flex items-center gap-2 rounded-lg border bg-card px-3 py-2 text-sm shadow-sm">
			<span className="text-muted-foreground shrink-0">API:</span>
			<div className="flex flex-wrap gap-1">
				{API_OPTIONS.map((opt) => (
					<Button
						key={opt.kind}
						type="button"
						variant={api === opt.kind ? "secondary" : "ghost"}
						size="sm"
						onClick={() => setApi(opt.kind)}
						className="h-7 px-2 text-xs"
						aria-pressed={api === opt.kind}
					>
						{opt.label}
					</Button>
				))}
			</div>
			{current && <span className="text-muted-foreground shrink-0 text-xs">:{current.port}</span>}
		</div>
	);
}

/** Prominent switcher for login/register pages – segmented control with label and port. */
export function ApiSwitcherAuth() {
	const { api, setApi } = useAuth();

	return (
		<fieldset
			className="flex flex-col gap-2 rounded-xl border bg-card/80 px-4 py-3 shadow-sm backdrop-blur-sm"
			aria-label="Backend API"
		>
			<legend className="text-muted-foreground text-xs font-medium">Backend API</legend>
			<div className="flex flex-wrap gap-2">
				{API_OPTIONS.map((opt) => (
					<Button
						key={opt.kind}
						type="button"
						variant={api === opt.kind ? "secondary" : "outline"}
						size="sm"
						onClick={() => setApi(opt.kind)}
						className={cn(
							"min-w-28 justify-start gap-2 font-medium transition-colors",
							api === opt.kind && "ring-2 ring-primary/50 ring-offset-2 ring-offset-background",
						)}
						aria-pressed={api === opt.kind}
						aria-label={`${opt.label} (${opt.description}), port ${opt.port}`}
					>
						{api === opt.kind && (
							<span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
						)}
						<span className="flex flex-col items-start text-left">
							<span>{opt.label}</span>
							<span className="text-muted-foreground text-xs font-normal">
								{opt.description} · :{opt.port}
							</span>
						</span>
					</Button>
				))}
			</div>
		</fieldset>
	);
}
