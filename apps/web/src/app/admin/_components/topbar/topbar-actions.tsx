"use client";

import { Moon01Icon, Notification03Icon, PrinterIcon, Sun01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import { type ComponentProps, useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type IconType = ComponentProps<typeof HugeiconsIcon>["icon"];

type IconBtnProps = {
	icon: IconType;
	label: string;
	dot?: boolean;
	onClick?: () => void;
};

function IconButton({ icon, label, dot, onClick }: IconBtnProps) {
	return (
		<Tooltip>
			<TooltipTrigger
				render={(props) => (
					<button
						type="button"
						{...props}
						onClick={onClick}
						aria-label={label}
						className="relative flex size-9 items-center justify-center rounded-lg text-dashboard-text-muted transition-all hover:bg-dashboard-hover hover:text-dashboard-text-primary active:scale-95"
					>
						<HugeiconsIcon icon={icon} size={18} strokeWidth={1.8} />
						{dot && (
							<span
								aria-hidden
								className="absolute top-1.5 right-1.5 block size-2 rounded-full bg-[#FF6A1A] ring-2 ring-dashboard-bg"
							/>
						)}
					</button>
				)}
			/>
			<TooltipContent side="bottom">{label}</TooltipContent>
		</Tooltip>
	);
}

function ThemeToggle() {
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);
	if (!mounted) {
		return (
			<span className="flex size-9 items-center justify-center rounded-lg text-dashboard-text-muted">
				<HugeiconsIcon icon={Moon01Icon} size={18} strokeWidth={1.8} />
			</span>
		);
	}
	const isDark = theme === "dark";
	const toggle = () => setTheme(isDark ? "light" : "dark");
	return (
		<Tooltip>
			<TooltipTrigger
				render={(props) => (
					<button
						type="button"
						{...props}
						onClick={toggle}
						aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
						className="relative flex size-9 items-center justify-center rounded-lg text-dashboard-text-muted transition-all hover:bg-dashboard-hover hover:text-dashboard-text-primary active:scale-95"
					>
						<HugeiconsIcon icon={isDark ? Sun01Icon : Moon01Icon} size={18} strokeWidth={1.8} />
					</button>
				)}
			/>
			<TooltipContent side="bottom">{isDark ? "Light mode" : "Dark mode"}</TooltipContent>
		</Tooltip>
	);
}

type Props = {
	avatarSrc?: string;
	avatarFallback?: string;
	unreadNotifications?: boolean;
	className?: string;
};

export function TopbarActions({
	avatarSrc,
	avatarFallback = "SP",
	unreadNotifications = true,
	className,
}: Props) {
	return (
		<div className={cn("flex items-center gap-1", className)}>
			<ThemeToggle />
			<IconButton icon={Notification03Icon} label="Notifications" dot={unreadNotifications} />
			<IconButton icon={PrinterIcon} label="Print" />

			<button
				type="button"
				aria-label="Account"
				className="ml-1 flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-zinc-600 to-zinc-800 font-semibold text-[12px] text-dashboard-text-primary ring-1 ring-dashboard-border-strong transition-all hover:ring-dashboard-border-focus active:scale-95"
			>
				{avatarSrc ? (
					// biome-ignore lint/performance/noImgElement: simple avatar, no next/image wrap needed here
					<img src={avatarSrc} alt="Account" className="size-full object-cover" />
				) : (
					<span>{avatarFallback}</span>
				)}
			</button>
		</div>
	);
}
