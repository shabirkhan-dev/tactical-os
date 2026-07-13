"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

type Props = {
	items: Crumb[];
	className?: string;
};

export function BreadcrumbTrail({ items, className }: Props) {
	return (
		<nav
			aria-label="Breadcrumb"
			className={cn("flex items-center gap-1.5 overflow-hidden text-[13px]", className)}
		>
			{items.map((item, idx) => {
				const isLast = idx === items.length - 1;
				const showSeparator = idx > 0;
				return (
					<Fragment key={item.label}>
						{showSeparator && (
							<HugeiconsIcon
								icon={ArrowRight01Icon}
								size={14}
								strokeWidth={2}
								className="text-dashboard-text-faint"
							/>
						)}
						{item.href && !isLast ? (
							<a
								href={item.href}
								className="text-dashboard-text-muted transition-colors hover:text-dashboard-text-secondary"
							>
								{item.label}
							</a>
						) : (
							<span
								className={cn(
									"truncate",
									isLast
										? "font-medium text-dashboard-text-secondary"
										: "text-dashboard-text-muted",
								)}
							>
								{item.label}
							</span>
						)}
					</Fragment>
				);
			})}
		</nav>
	);
}
