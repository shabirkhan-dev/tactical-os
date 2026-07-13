"use client";

import { TooltipProvider } from "@school-os/ui/components/tooltip";
import { cn } from "@/lib/utils";
import { BreadcrumbTrail, type Crumb } from "./topbar/breadcrumb-trail";
import { GlobalSearch } from "./topbar/global-search";
import { TopbarActions } from "./topbar/topbar-actions";

type Props = {
	crumbs?: Crumb[];
	className?: string;
};

const defaultCrumbs: Crumb[] = [{ label: "Dashboard", href: "/admin" }, { label: "Overview" }];

export function AdminTopbar({ crumbs = defaultCrumbs, className }: Props) {
	return (
		<TooltipProvider delay={120}>
			<header
				className={cn(
					"sticky top-0 z-10 flex h-14 shrink-0 items-center gap-4 border-dashboard-border-subtle border-b bg-dashboard-topbar-bg/80 px-5 backdrop-blur-md",
					className,
				)}
			>
				<BreadcrumbTrail items={crumbs} className="shrink-0" />

				<div className="flex flex-1 justify-center">
					<GlobalSearch className="w-full max-w-[420px]" />
				</div>

				<TopbarActions className="shrink-0" />
			</header>
		</TooltipProvider>
	);
}
