"use client";

import { getApiDisplayName } from "@/components/api-switcher";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/context/auth-context";

function initials(username: string): string {
	const parts = username.trim().split(/\s+/);
	if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
	return username.slice(0, 2).toUpperCase() || "?";
}

export default function ProfilePage() {
	const { user, api } = useAuth();
	if (!user) return null;

	const fallback = initials(user.username);

	return (
		<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			{/* Profile header card – same visual style as dashboard section cards */}
			<div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6">
				<Card className="@container/card max-w-3xl">
					<CardHeader className="flex flex-row flex-wrap items-center gap-4 pb-2">
						<Avatar size="lg" className="size-14 ring-2 ring-background">
							<AvatarFallback className="text-lg font-semibold">{fallback}</AvatarFallback>
						</Avatar>
						<div className="flex min-w-0 flex-1 flex-col gap-1">
							<CardTitle className="text-xl font-semibold md:text-2xl">{user.username}</CardTitle>
							<CardDescription className="text-sm">{user.email}</CardDescription>
							<Badge variant={user.is_active ? "default" : "secondary"} className="mt-1 w-fit">
								{user.is_active ? "Active" : "Inactive"}
							</Badge>
						</div>
					</CardHeader>
					<CardFooter className="flex-col items-start gap-1.5 border-t pt-4 text-sm">
						<span className="text-muted-foreground">
							Account data from {getApiDisplayName(api)} · /auth/me
						</span>
					</CardFooter>
				</Card>
			</div>

			{/* Account details */}
			<div className="px-4 lg:px-6">
				<Card className="max-w-3xl">
					<CardHeader>
						<CardTitle>Account details</CardTitle>
						<CardDescription>Your profile information from the API</CardDescription>
					</CardHeader>
					<CardContent className="divide-y divide-border">
						<DetailRow label="Username" value={user.username} />
						<DetailRow label="Email" value={user.email} />
						<DetailRow label="User ID" value={String(user.id)} mono />
						<DetailRow
							label="Status"
							value={user.is_active ? "Active" : "Inactive"}
							badge={user.is_active}
						/>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

function DetailRow({
	label,
	value,
	mono,
	badge,
}: {
	label: string;
	value: string;
	mono?: boolean;
	badge?: boolean;
}) {
	return (
		<div className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
			<span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">
				{label}
			</span>
			{badge !== undefined ? (
				<Badge variant={badge ? "default" : "secondary"} className="w-fit">
					{value}
				</Badge>
			) : (
				<span className={mono ? "font-mono text-sm" : "font-medium"}>{value}</span>
			)}
		</div>
	);
}
