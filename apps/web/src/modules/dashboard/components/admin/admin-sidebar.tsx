"use client";

import Image from "next/image";

type SidebarItem = {
	label: string;
	icon: React.ReactNode;
	active?: boolean;
};

type SidebarSection = {
	title: string;
	items: SidebarItem[];
};

/* ── SVG Icons ── */
const DashboardIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<rect x="1" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
		<rect x="10" y="1" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
		<rect x="1" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
		<rect x="10" y="10" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
	</svg>
);

const BoxIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M9 1L16 5V13L9 17L2 13V5L9 1Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
		<path d="M9 17V9" stroke="currentColor" strokeWidth="1.5" />
		<path d="M16 5L9 9L2 5" stroke="currentColor" strokeWidth="1.5" />
	</svg>
);

const TransactionsIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path d="M2 5H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M2 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M2 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path
			d="M14 11L16 13L14 15"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const ChartIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M2 14L6 8L10 11L16 4"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M13 4H16V7"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const MessageIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M3 3H15C15.55 3 16 3.45 16 4V12C16 12.55 15.55 13 15 13H5L2 16V4C2 3.45 2.45 3 3 3Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
	</svg>
);

const TeamIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<circle cx="7" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
		<path
			d="M2 15C2 12.24 4.24 10 7 10C9.76 10 12 12.24 12 15"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<circle cx="13" cy="6" r="2" stroke="currentColor" strokeWidth="1.5" />
		<path
			d="M13 11C14.66 11 16 12.34 16 14"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
);

const CampaignIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M3 5V13L9 9L15 13V5L9 9L3 5Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
	</svg>
);

const CustomerListIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<circle cx="9" cy="5" r="3" stroke="currentColor" strokeWidth="1.5" />
		<path
			d="M3 16C3 12.69 5.69 10 9 10C12.31 10 15 12.69 15 16"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
	</svg>
);

const ChannelsIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
		<rect x="11" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
		<rect x="2" y="11" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
		<rect x="11" y="11" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5" />
	</svg>
);

const OrderIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M3 3H5L7 13H14"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<circle cx="8" cy="16" r="1" fill="currentColor" />
		<circle cx="13" cy="16" r="1" fill="currentColor" />
		<path d="M5 5H16L14 11H7" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
	</svg>
);

const RolesIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M9 2L3 5V9C3 12.31 5.55 15.36 9 16C12.45 15.36 15 12.31 15 9V5L9 2Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
	</svg>
);

const BillingIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
		<path d="M2 8H16" stroke="currentColor" strokeWidth="1.5" />
	</svg>
);

const IntegrationsIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.5" />
		<path d="M9 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M9 14V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M2 9H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M14 9H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
	</svg>
);

const SupportIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M3 4C3 3.45 3.45 3 4 3H14C14.55 3 15 3.45 15 4V11C15 11.55 14.55 12 14 12H6L3 15V4Z"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinejoin="round"
		/>
		<circle cx="7" cy="7.5" r="0.5" fill="currentColor" />
		<circle cx="9" cy="7.5" r="0.5" fill="currentColor" />
		<circle cx="11" cy="7.5" r="0.5" fill="currentColor" />
	</svg>
);

const HelpIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
		<path
			d="M7 7C7 5.9 7.9 5 9 5C10.1 5 11 5.9 11 7C11 8 9.5 8.5 9.5 9.5"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<circle cx="9.5" cy="12" r="0.5" fill="currentColor" />
	</svg>
);

const SettingsIcon = () => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<circle cx="9" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.5" />
		<path
			d="M14.5 9C14.5 8.6 14.47 8.21 14.41 7.83L16 6.64L14.5 4.04L12.62 4.67C12.08 4.21 11.46 3.85 10.78 3.62L10.5 1.5H7.5L7.22 3.62C6.54 3.85 5.92 4.21 5.38 4.67L3.5 4.04L2 6.64L3.59 7.83C3.53 8.21 3.5 8.6 3.5 9C3.5 9.4 3.53 9.79 3.59 10.17L2 11.36L3.5 13.96L5.38 13.33C5.92 13.79 6.54 14.15 7.22 14.38L7.5 16.5H10.5L10.78 14.38C11.46 14.15 12.08 13.79 12.62 13.33L14.5 13.96L16 11.36L14.41 10.17C14.47 9.79 14.5 9.4 14.5 9Z"
			stroke="currentColor"
			strokeWidth="1.3"
			strokeLinejoin="round"
		/>
	</svg>
);

const ChevronDownIcon = () => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		aria-label="icon"
		role="img"
	>
		<path
			d="M4 6L8 10L12 6"
			stroke="currentColor"
			strokeWidth="1.5"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const sections: SidebarSection[] = [
	{
		title: "Main Menu",
		items: [
			{ label: "Dashboard", icon: <DashboardIcon />, active: true },
			{ label: "Products", icon: <BoxIcon /> },
			{ label: "Transactions", icon: <TransactionsIcon /> },
			{ label: "Reports & Analytics", icon: <ChartIcon /> },
			{ label: "Messages", icon: <MessageIcon /> },
			{ label: "Team Performance", icon: <TeamIcon /> },
			{ label: "Campaigns", icon: <CampaignIcon /> },
		],
	},
	{
		title: "Customers",
		items: [
			{ label: "Customer List", icon: <CustomerListIcon /> },
			{ label: "Channels", icon: <ChannelsIcon /> },
			{ label: "Order Management", icon: <OrderIcon /> },
		],
	},
	{
		title: "Management",
		items: [
			{ label: "Roles & Permissions", icon: <RolesIcon /> },
			{ label: "Billing & Subscription", icon: <BillingIcon /> },
			{ label: "Integrations", icon: <IntegrationsIcon /> },
		],
	},
	{
		title: "Settings",
		items: [
			{ label: "Customer Support", icon: <SupportIcon /> },
			{ label: "Help Center", icon: <HelpIcon /> },
			{ label: "System Settings", icon: <SettingsIcon /> },
		],
	},
];

export function AdminSidebar() {
	return (
		<aside className="admin-sidebar">
			{/* Logo */}
			<div className="admin-sidebar-logo">
				<div className="admin-sidebar-logo-icon">
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="icon" role="img">
						<path d="M8 1L14 5V11L8 15L2 11V5L8 1Z" fill="white" />
					</svg>
				</div>
				<div className="admin-sidebar-logo-text">
					<span>Agency</span>
					<span>Spark Pixel Team</span>
				</div>
			</div>

			{/* Nav sections */}
			{sections.map((section) => (
				<div key={section.title} className="admin-sidebar-section">
					<div className="admin-sidebar-section-title">{section.title}</div>
					{section.items.map((item) => (
						<div key={item.label} className={`admin-sidebar-item${item.active ? " active" : ""}`}>
							{item.icon}
							<span>{item.label}</span>
						</div>
					))}
				</div>
			))}

			{/* User */}
			<div className="admin-sidebar-user">
				<div className="admin-sidebar-user-avatar">
					<Image
						src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&fit=crop&crop=face"
						alt="Salung Prastyo"
						width={36}
						height={36}
					/>
				</div>
				<div className="admin-sidebar-user-info">
					<div className="name">Salung Prastyo</div>
					<div className="plan">Pro Plan</div>
				</div>
				<div className="admin-sidebar-user-chevron">
					<ChevronDownIcon />
				</div>
			</div>
		</aside>
	);
}
