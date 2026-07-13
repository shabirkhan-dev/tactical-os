"use client";

import { Alert, AlertDescription, AlertTitle } from "@school-os/ui/components/alert";
import { Button } from "@school-os/ui/components/button";
import { Spinner } from "@school-os/ui/components/spinner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { userInitials } from "@/lib/user-display";
import { ProfileForm } from "@/modules/users/components/profile-form";
import { useUpdateUserProfileMutation } from "@/modules/users/hooks/use-user-mutations";
import { useCurrentUserQuery } from "@/modules/users/hooks/use-user-queries";
import type { UpdateUserProfileInput } from "@/modules/users/types/user.types";

export function AccountProfile() {
	const currentUser = useCurrentUserQuery();
	const update = useUpdateUserProfileMutation();
	const user = currentUser.data;
	const [form, setForm] = useState<UpdateUserProfileInput>({});

	useEffect(() => {
		if (!user) return;
		setForm({
			username: user.username,
			displayName: user.profile?.displayName ?? null,
			avatarUrl: user.profile?.avatarUrl ?? null,
			bio: user.profile?.bio ?? null,
			timezone: user.profile?.timezone ?? null,
			locale: user.profile?.locale ?? null,
		});
	}, [user]);

	if (!user)
		return (
			<div className="flex min-h-48 items-center justify-center">
				<Spinner className="size-6" />
			</div>
		);

	return (
		<div className="mx-auto grid w-full max-w-3xl gap-4 px-3 py-4 sm:px-6 sm:py-6">
			<section className="rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px]">
				<div className="rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner px-4 py-4">
					<div className="flex items-center gap-3">
						{user.profile?.avatarUrl ? (
							<Image
								src={user.profile.avatarUrl}
								alt=""
								width={56}
								height={56}
								unoptimized
								className="size-14 rounded-2xl object-cover ring-1 ring-dashboard-border-subtle"
							/>
						) : (
							<div className="flex size-14 items-center justify-center rounded-2xl bg-zinc-800 font-semibold text-[18px]">
								{userInitials(user.profile?.displayName ?? user.username)}
							</div>
						)}
						<div className="min-w-0">
							<h1 className="truncate font-semibold text-[22px]">
								{user.profile?.displayName ?? user.username}
							</h1>
							<p className="truncate text-[13px] text-dashboard-text-muted">{user.email}</p>
						</div>
					</div>
				</div>
			</section>
			{update.isError ? (
				<Alert variant="destructive">
					<AlertTitle>Could not update profile</AlertTitle>
					<AlertDescription>{update.error.message}</AlertDescription>
				</Alert>
			) : null}
			{update.isSuccess ? (
				<Alert>
					<AlertTitle>Profile updated</AlertTitle>
					<AlertDescription>Your changes are now active.</AlertDescription>
				</Alert>
			) : null}
			<section className="rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px]">
				<div className="rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner p-4">
					<div className="mb-4">
						<h2 className="font-semibold text-[15px]">Profile details</h2>
						<p className="text-[13px] text-dashboard-text-muted">
							Presentation details are separate from your sign-in identity.
						</p>
					</div>
					<ProfileForm
						value={form}
						pending={update.isPending}
						onChange={setForm}
						onSubmit={(event) => {
							event.preventDefault();
							update.mutate(form);
						}}
					/>
				</div>
			</section>
			<section className="rounded-2xl border border-dashboard-border bg-dashboard-card-outer p-[2px]">
				<div className="flex flex-col items-start justify-between gap-3 rounded-xl border border-dashboard-border-subtle bg-dashboard-card-inner p-4 sm:flex-row sm:items-center">
					<div>
						<h2 className="font-semibold text-[15px]">Account security</h2>
						<p className="text-[13px] text-dashboard-text-muted">
							Passwords, passkeys, 2FA, and sessions.
						</p>
					</div>
					<Button variant="outline" size="sm" render={<Link href="/admin/account/security" />}>
						Open security
					</Button>
				</div>
			</section>
		</div>
	);
}
