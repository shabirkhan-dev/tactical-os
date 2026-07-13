import type { Metadata } from "next";
import { AccountProfile } from "@/modules/auth/components";

export const metadata: Metadata = { title: "Profile" };

export default function AdminAccountProfilePage() {
	return <AccountProfile />;
}
