"use client";

import { Logout01Icon, ShieldIcon, UserCircle02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { useAuth } from "@/context/auth-context";
import { userInitials } from "@/lib/user-display";
import { HeaderHugeIcon } from "@/modules/chat/components/header/huge-icon";

export function HeaderUserMenu() {
	const router = useRouter();
	const { user, logout } = useAuth();
	const [open, setOpen] = useState(false);
	const menuId = useId();
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) {
			return;
		}

		function handlePointerDown(event: MouseEvent) {
			if (!rootRef.current?.contains(event.target as Node)) {
				setOpen(false);
			}
		}

		function handleKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handlePointerDown);
		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("mousedown", handlePointerDown);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [open]);

	if (!user) {
		return null;
	}

	const initials = userInitials(user.username);

	async function handleLogout() {
		setOpen(false);
		await logout();
		router.push("/login");
	}

	return (
		<div className="account-menu" ref={rootRef}>
			<button
				className="avatar-button"
				type="button"
				aria-label="Account menu"
				aria-haspopup="menu"
				aria-expanded={open}
				aria-controls={menuId}
				onClick={() => setOpen((current) => !current)}
			>
				<span className="avatar-button__initials" aria-hidden="true">
					{initials}
				</span>
			</button>

			{open ? (
				<div className="account-menu__panel" id={menuId} role="menu">
					<div className="account-menu__identity">
						<span className="account-menu__avatar" aria-hidden="true">
							{initials}
						</span>
						<div className="account-menu__meta">
							<p className="account-menu__name">{user.username}</p>
							<p className="account-menu__email">{user.email}</p>
						</div>
					</div>

					<div className="account-menu__divider" />

					<Link
						className="account-menu__item"
						href="/chat/account/profile"
						role="menuitem"
						onClick={() => setOpen(false)}
					>
						<HeaderHugeIcon icon={UserCircle02Icon} />
						<span>Profile</span>
					</Link>
					<Link
						className="account-menu__item"
						href="/chat/account/security"
						role="menuitem"
						onClick={() => setOpen(false)}
					>
						<HeaderHugeIcon icon={ShieldIcon} />
						<span>Security</span>
					</Link>

					<div className="account-menu__divider" />

					<button
						className="account-menu__item account-menu__item--danger"
						type="button"
						role="menuitem"
						onClick={() => void handleLogout()}
					>
						<HeaderHugeIcon icon={Logout01Icon} />
						<span>Log out</span>
					</button>
				</div>
			) : null}
		</div>
	);
}
