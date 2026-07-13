import type { Metadata } from "next";
import { SignupForm } from "@/modules/auth/components";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-md">
				<SignupForm />
			</div>
		</div>
	);
}
