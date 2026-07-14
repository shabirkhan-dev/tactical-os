import Link from "next/link";

export default function BillingSuccessPage() {
	return (
		<main className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 text-center">
			<h1 className="font-serif text-3xl text-foreground">Payment received</h1>
			<p className="text-muted-foreground text-sm leading-6">
				Your subscription will activate once the provider webhook confirms it. This usually takes a
				few seconds.
			</p>
			<div className="flex gap-3">
				<Link
					href="/billing"
					className="rounded-full bg-primary px-5 py-2.5 text-primary-foreground text-sm"
				>
					View billing
				</Link>
				<Link href="/" className="rounded-full border border-border px-5 py-2.5 text-sm">
					Home
				</Link>
			</div>
		</main>
	);
}
