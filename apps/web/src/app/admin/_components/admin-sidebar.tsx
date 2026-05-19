"use client";

import {
	BubbleChatIcon,
	Building03Icon,
	ClipboardIcon,
	ComputerIcon,
	CreditCardIcon,
	DashboardSquare01Icon,
	File01Icon,
	HeadsetIcon,
	HelpCircleIcon,
	Invoice01Icon,
	Megaphone01Icon,
	PuzzleIcon,
	Settings02Icon,
	SidebarLeftIcon,
	Tick02Icon,
	UnfoldMoreIcon,
	UserMultiple02Icon,
	UserSettings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { type ComponentProps, useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

type IconType = ComponentProps<typeof HugeiconsIcon>["icon"];
type NavItem = { id: string; label: string; icon: IconType };
type NavSection = { heading: string; items: NavItem[] };

const sections: NavSection[] = [
	{
		heading: "Main Menu",
		items: [
			{ id: "dashboard", label: "Dashboard", icon: DashboardSquare01Icon },
			{ id: "products", label: "Products", icon: Building03Icon },
			{ id: "transactions", label: "Transactions", icon: CreditCardIcon },
			{ id: "reports", label: "Reports & Analytics", icon: File01Icon },
			{ id: "messages", label: "Messages", icon: BubbleChatIcon },
			{ id: "team", label: "Team Performance", icon: ComputerIcon },
			{ id: "campaigns", label: "Campaigns", icon: Megaphone01Icon },
		],
	},
	{
		heading: "Customers",
		items: [
			{ id: "customer-list", label: "Customer List", icon: UserMultiple02Icon },
			{ id: "channels", label: "Channels", icon: ComputerIcon },
			{ id: "orders", label: "Order Management", icon: Invoice01Icon },
		],
	},
	{
		heading: "Management",
		items: [
			{ id: "roles", label: "Roles & Permissions", icon: UserSettings01Icon },
			{ id: "billing", label: "Billing & Subscription", icon: ClipboardIcon },
			{ id: "integrations", label: "Integrations", icon: PuzzleIcon },
		],
	},
	{
		heading: "Settings",
		items: [
			{ id: "support", label: "Customer Support", icon: HeadsetIcon },
			{ id: "help", label: "Help Center", icon: HelpCircleIcon },
			{ id: "system", label: "System Settings", icon: Settings02Icon },
		],
	},
];

type Agency = { id: string; name: string; kind: string; mark: string };

const agencies: Agency[] = [
	{ id: "spark", name: "Spark Pixel Team", kind: "Agency", mark: "S" },
	{ id: "north", name: "Northwind Studio", kind: "Agency", mark: "N" },
	{ id: "atlas", name: "Atlas Collective", kind: "Studio", mark: "A" },
];

const ACCENT = "#FF6A1A";

export function AdminSidebar() {
	const [collapsed, setCollapsed] = useState(false);
	const [activeId, setActiveId] = useState("dashboard");
	const [agencyId, setAgencyId] = useState(agencies[0].id);

	const agency = agencies.find((a) => a.id === agencyId) ?? agencies[0];
	const width = collapsed ? "w-[76px]" : "w-[260px]";

	return (
		<TooltipProvider delay={120}>
			<aside
				className={cn(
					"group/sidebar relative flex h-screen shrink-0 flex-col border-dashboard-border-subtle border-r bg-dashboard-sidebar-bg transition-[width] duration-200 ease-out",
					width,
				)}
			>
				{/* Floating collapse toggle on the right edge */}
				<Tooltip>
					<TooltipTrigger
						render={(props) => (
							<button
								type="button"
								{...props}
								onClick={() => setCollapsed((v) => !v)}
								aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
								className={cn(
									"absolute top-6 right-0 z-20 flex size-6 translate-x-1/2 items-center justify-center rounded-full border border-dashboard-border-strong bg-dashboard-surface-elevated text-dashboard-text-muted opacity-0 shadow-lg transition-all duration-150 group-hover/sidebar:opacity-100 hover:border-dashboard-border-focus hover:bg-dashboard-surface-strong hover:text-dashboard-text-primary focus-visible:opacity-100 active:scale-90",
								)}
							>
								<HugeiconsIcon
									icon={SidebarLeftIcon}
									size={13}
									strokeWidth={2}
									className={cn("transition-transform duration-200", collapsed && "rotate-180")}
								/>
							</button>
						)}
					/>
					<TooltipContent side="right">
						{collapsed ? "Expand sidebar" : "Collapse sidebar"}
					</TooltipContent>
				</Tooltip>

				{/* Workspace switcher */}
				<div className="px-3 pt-4 pb-3">
					<DropdownMenu>
						<DropdownMenuTrigger
							render={(props) => (
								<button
									type="button"
									{...props}
									className={cn(
										"group/trigger flex w-full items-center gap-3 rounded-xl bg-dashboard-surface px-2 py-2 text-left transition-all hover:bg-dashboard-surface-hover active:scale-[0.985]",
										collapsed && "justify-center px-1",
									)}
								>
									<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-black shadow-sm ring-1 ring-black/5">
										<span className="font-bold text-[15px] leading-none">{agency.mark}</span>
									</div>
									{!collapsed && (
										<>
											<div className="min-w-0 flex-1">
												<div className="text-[11px] text-dashboard-text-dim leading-tight">
													{agency.kind}
												</div>
												<div className="truncate font-semibold text-[13px] text-dashboard-text-secondary leading-tight tracking-tight">
													{agency.name}
												</div>
											</div>
											<HugeiconsIcon
												icon={UnfoldMoreIcon}
												size={16}
												strokeWidth={1.8}
												className="text-dashboard-text-dim transition-colors group-hover/trigger:text-dashboard-text-secondary"
											/>
										</>
									)}
								</button>
							)}
						/>
						<DropdownMenuContent
							align="start"
							sideOffset={8}
							className="w-[244px] border-dashboard-border bg-dashboard-surface text-dashboard-text-secondary"
						>
							<DropdownMenuLabel className="text-[10.5px] text-dashboard-text-dim uppercase tracking-wider">
								Switch workspace
							</DropdownMenuLabel>
							<DropdownMenuSeparator className="bg-dashboard-border" />
							{agencies.map((a) => {
								const selected = a.id === agencyId;
								return (
									<DropdownMenuItem
										key={a.id}
										onClick={() => setAgencyId(a.id)}
										className="gap-3 focus:bg-dashboard-hover-strong"
									>
										<div className="flex size-8 items-center justify-center rounded-md bg-white font-bold text-[13px] text-black ring-1 ring-black/5">
											{a.mark}
										</div>
										<div className="min-w-0 flex-1">
											<div className="truncate font-medium text-[13px]">{a.name}</div>
											<div className="text-[11px] text-dashboard-text-dim">{a.kind}</div>
										</div>
										{selected && (
											<HugeiconsIcon icon={Tick02Icon} size={16} style={{ color: ACCENT }} />
										)}
									</DropdownMenuItem>
								);
							})}
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				{/* Nav */}
				<nav
					className={cn(
						"flex-1 overflow-y-auto px-3 pb-4",
						"[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-dashboard-border [&::-webkit-scrollbar-track]:bg-transparent",
					)}
				>
					{sections.map((section, idx) => (
						<div
							key={section.heading}
							className={cn(idx > 0 && "mt-3 border-dashboard-border-subtle border-t pt-3")}
						>
							{!collapsed ? (
								<div className="px-2 pt-1 pb-1.5 font-medium text-[11px] text-dashboard-text-dim tracking-tight">
									{section.heading}
								</div>
							) : (
								idx > 0 && <div className="h-1" />
							)}
							<ul className="space-y-0.5">
								{section.items.map((item) => {
									const active = item.id === activeId;
									const button = (
										<button
											type="button"
											onClick={() => setActiveId(item.id)}
											className={cn(
												"group/item flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[13px] transition-all duration-150",
												collapsed && "justify-center px-0",
												active
													? "bg-dashboard-hover-strong font-medium hover:bg-dashboard-hover-strong"
													: "font-normal text-dashboard-text-muted hover:bg-dashboard-hover hover:text-dashboard-text-secondary active:scale-[0.985]",
											)}
											style={active ? { color: ACCENT } : undefined}
										>
											<HugeiconsIcon
												icon={item.icon}
												size={18}
												strokeWidth={active ? 2 : 1.7}
												className={cn(
													"shrink-0 transition-colors",
													!active &&
														"text-dashboard-text-dim group-hover/item:text-dashboard-text-secondary",
												)}
												style={active ? { color: ACCENT } : undefined}
											/>
											{!collapsed && <span className="truncate">{item.label}</span>}
										</button>
									);

									return (
										<li key={item.id}>
											{collapsed ? (
												<Tooltip>
													<TooltipTrigger render={() => button} />
													<TooltipContent side="right">{item.label}</TooltipContent>
												</Tooltip>
											) : (
												button
											)}
										</li>
									);
								})}
							</ul>
						</div>
					))}
				</nav>

				{/* User card */}
				<div className="border-dashboard-border-subtle border-t p-3">
					<button
						type="button"
						className={cn(
							"flex w-full items-center gap-3 rounded-xl bg-dashboard-surface-elevated px-2 py-2 text-left transition-all hover:bg-dashboard-surface-strong active:scale-[0.985]",
							collapsed && "justify-center px-1",
						)}
					>
						<div className="relative shrink-0">
							<div className="flex size-9 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-zinc-600 to-zinc-800 font-semibold text-[13px] text-dashboard-text-secondary ring-1 ring-dashboard-border-subtle">
								SP
							</div>
							<span className="absolute right-[-2px] bottom-[-2px] block size-2.5 rounded-full bg-emerald-500 ring-2 ring-dashboard-surface" />
						</div>
						{!collapsed && (
							<>
								<div className="min-w-0 flex-1">
									<div className="truncate font-semibold text-[13px] text-dashboard-text-secondary leading-tight tracking-tight">
										Salung Prastyo
									</div>
									<div className="text-[11px] text-dashboard-text-dim leading-tight">Pro Plan</div>
								</div>
								<HugeiconsIcon
									icon={UnfoldMoreIcon}
									size={16}
									strokeWidth={1.8}
									className="text-dashboard-text-dim"
								/>
							</>
						)}
					</button>
				</div>
			</aside>
		</TooltipProvider>
	);
}
