import Link from "next/link";

export default function BillingCancelPage() {
	return (
		<main className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="font-serif text-3xl text-foreground">Checkout canceled</h1>
			<p className="text-muted-foreground text-sm leading-6">
				No charge was made. You can restart checkout anytime from billing.
			</p>
			<div className="flex gap-3">
				<Link
					href="/billing"
					className="rounded-full bg-primary px-5 py-2.5 text-primary-foreground text-sm"
				>
					Try again
				</Link>
				<Link href="/pricing" className="rounded-full border border-border px-5 py-2.5 text-sm">
					Pricing
				</Link>
			</div>
		</main>
	);
}
