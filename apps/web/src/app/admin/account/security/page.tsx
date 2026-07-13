import type { Metadata } from "next";
import { AccountSecurity } from "@/modules/auth/components";

export const metadata: Metadata = { title: "Account security" };

export default function AdminAccountSecurityPage() {
	return <AccountSecurity />;
}
