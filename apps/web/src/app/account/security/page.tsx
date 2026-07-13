import { redirect } from "next/navigation";

export default function AccountSecurityRedirectPage() {
	redirect("/admin/account/security");
}
