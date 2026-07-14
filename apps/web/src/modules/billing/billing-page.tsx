"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/auth-context";
import {
	type BillingInterval,
	billingService,
	type PaymentProviderName,
	type PlanCode,
} from "./billing.service";

const PLANS: Array<{ code: PlanCode; label: string; blurb: string }> = [
	{ code: "team", label: "Team", blurb: "Shared workspaces for growing school products." },
	{ code: "enterprise", label: "Enterprise", blurb: "Support, seats, and org-scale limits." },
];

export function BillingPageContent() {
	const { token, user, loading } = useAuth();
	const router = useRouter();
	const [providers, setProviders] = useState<PaymentProviderName[]>([]);
	const [provider, setProvider] = useState<PaymentProviderName>("stripe");
	const [planCode, setPlanCode] = useState<PlanCode>("team");
	const [billingInterval, setBillingInterval] = useState<BillingInterval>("monthly");
	const [error, setError] = useState<string | null>(null);
	const [busy, setBusy] = useState(false);
	const [status, setStatus] = useState<string | null>(null);

	useEffect(() => {
		if (loading) return;
		if (!token) {
			router.replace("/login?next=/billing");
			return;
		}
		void billingService
			.listProviders(token)
			.then((result) => {
				setProviders(result.providers);
				if (result.providers[0]) setProvider(result.providers[0]);
			})
			.catch(() => setProviders([]));
		void billingService
			.getSubscription(token)
			.then((result) => {
				if (result.subscription) {
					setStatus(
						`${result.subscription.planCode} · ${result.subscription.status} via ${result.subscription.provider}`,
					);
				}
			})
			.catch(() => undefined);
	}, [loading, router, token]);

	const startCheckout = async () => {
		if (!token) return;
		setBusy(true);
		setError(null);
		try {
			const result = await billingService.createCheckout(token, {
				provider,
				planCode,
				billingInterval,
			});
			window.location.href = result.checkoutUrl;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Checkout failed");
			setBusy(false);
		}
	};

	const openPortal = async () => {
		if (!token) return;
		setBusy(true);
		setError(null);
		try {
			const result = await billingService.createPortal(token, { provider: "stripe" });
			window.location.href = result.url;
		} catch (err) {
			setError(err instanceof Error ? err.message : "Portal unavailable");
			setBusy(false);
		}
	};

	if (loading || !user) {
		return <p className="text-muted-foreground text-sm">Loading billing…</p>;
	}

	return (
		<div className="mx-auto flex w-full max-w-xl flex-col gap-8 px-4 py-16 sm:px-8">
			<div>
				<p className="font-medium text-muted-foreground text-sm">Billing</p>
				<h1 className="mt-2 font-serif text-3xl text-foreground">Choose a plan</h1>
				<p className="mt-3 text-muted-foreground text-sm leading-6">
					Checkout uses Stripe or Razorpay depending on your API keys. Free starter stays free —
					pick Team or Enterprise to subscribe.
				</p>
				{status ? <p className="mt-3 text-foreground text-sm">Current: {status}</p> : null}
			</div>

			<div className="flex flex-col gap-3">
				<p className="font-medium text-foreground text-sm">Provider</p>
				{providers.length === 0 ? (
					<p className="text-muted-foreground text-sm">
						No payment keys configured yet. Add Stripe/Razorpay env vars in{" "}
						<code className="text-foreground">apps/nest-api/.env</code>.
					</p>
				) : (
					<div className="flex gap-2">
						{providers.map((item) => (
							<button
								key={item}
								type="button"
								onClick={() => setProvider(item)}
								className={`rounded-full border px-4 py-2 text-sm capitalize ${
									provider === item
										? "border-foreground bg-foreground text-background"
										: "border-border text-foreground"
								}`}
							>
								{item}
							</button>
						))}
					</div>
				)}
			</div>

			<div className="flex flex-col gap-3">
				<p className="font-medium text-foreground text-sm">Plan</p>
				<div className="grid gap-3">
					{PLANS.map((plan) => (
						<button
							key={plan.code}
							type="button"
							onClick={() => setPlanCode(plan.code)}
							className={`rounded-2xl border px-4 py-4 text-left ${
								planCode === plan.code ? "border-foreground" : "border-border"
							}`}
						>
							<p className="font-medium text-foreground">{plan.label}</p>
							<p className="mt-1 text-muted-foreground text-sm">{plan.blurb}</p>
						</button>
					))}
				</div>
			</div>

			<div className="flex gap-2">
				{(["monthly", "yearly"] as const).map((interval) => (
					<button
						key={interval}
						type="button"
						onClick={() => setBillingInterval(interval)}
						className={`rounded-full border px-4 py-2 text-sm capitalize ${
							billingInterval === interval
								? "border-foreground bg-foreground text-background"
								: "border-border text-foreground"
						}`}
					>
						{interval}
					</button>
				))}
			</div>

			{error ? <p className="text-destructive text-sm">{error}</p> : null}

			<div className="flex flex-wrap gap-3">
				<button
					type="button"
					disabled={busy || providers.length === 0}
					onClick={() => void startCheckout()}
					className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 font-medium text-primary-foreground text-sm disabled:opacity-50"
				>
					{busy ? "Redirecting…" : "Continue to checkout"}
				</button>
				{provider === "stripe" ? (
					<button
						type="button"
						disabled={busy}
						onClick={() => void openPortal()}
						className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 font-medium text-foreground text-sm"
					>
						Manage billing
					</button>
				) : null}
				<Link
					href="/pricing"
					className="inline-flex h-11 items-center justify-center rounded-full px-4 text-muted-foreground text-sm"
				>
					Back to pricing
				</Link>
			</div>
		</div>
	);
}
