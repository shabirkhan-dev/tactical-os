"use client";

import Link from "next/link";

import { useAuth } from "@/context/auth-context";
import { userInitials } from "@/lib/user-display";

export function SidebarUserCard() {
	const { user } = useAuth();

	if (!user) {
		return null;
	}

	const verifiedLabel = user.emailVerified ? "Verified" : "Unverified";

	return (
		<div className="sidebar-user-card">
			<Link className="sidebar-user-card__link" href="/chat/account/profile">
				<span className="sidebar-user-card__avatar" aria-hidden="true">
					{userInitials(user.username)}
				</span>
				<span className="sidebar-user-card__meta">
					<span className="sidebar-user-card__name">{user.username}</span>
					<span className="sidebar-user-card__email">{user.email}</span>
					<span className="sidebar-user-card__status">
						{user.isActive ? "Active" : "Inactive"} · {verifiedLabel}
					</span>
				</span>
			</Link>
		</div>
	);
}
