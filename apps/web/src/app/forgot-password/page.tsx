import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/modules/auth/components";

export const metadata: Metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-md">
				<ForgotPasswordForm />
			</div>
		</div>
	);
}
