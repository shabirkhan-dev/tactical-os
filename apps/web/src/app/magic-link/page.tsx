import type { Metadata } from "next";
import { Suspense } from "react";
import { MagicLinkConsumer } from "@/modules/auth/components";

export const metadata: Metadata = { title: "Secure sign in" };

export default function MagicLinkPage() {
	return (
		<main className="flex min-h-svh items-center justify-center p-6">
			<div className="w-full max-w-md">
				<Suspense fallback={null}>
					<MagicLinkConsumer />
				</Suspense>
			</div>
		</main>
	);
}
