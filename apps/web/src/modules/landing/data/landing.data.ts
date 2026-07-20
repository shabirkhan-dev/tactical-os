import {
	ApertureIcon,
	CommandIcon,
	GemIcon,
	HexagonIcon,
	OctagonIcon,
	SecurityCheckIcon,
	TriangleIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

export const SITE = {
	name: "Tactical OS",
	title: "Tactical OS — operator training and readiness",
	description:
		"Drill logging, timers, weapon history, and instructor dashboards for training academies — web command center and offline mobile at the range.",
} as const;

export const LANDING_COPY = {
	heroBadge: "Built for training academies",
	heroTitlePrimary: "Train hard. Track everything.",
	heroTitleSecondary: "prove readiness with data",
	heroSubtitle:
		"Drill logging, built-in timers, weapon and accuracy history, and instructor dashboards — web command center and mobile field use, offline at the range.",
	heroCtaPrimary: "Explore the platform",
	heroCtaSecondary: "View the roadmap",
	workflowCardTitle: "CQB qualification drill",
	workflowCardSub: "Alpha cohort · Range B",
	workflowProgressLabel: "Drill sequence",
	workflowCompleteLabel: "Qualified — synced to command",
	chatCardTitle: "Instructor board",
	chatCardSub: "Tactical OS · live review",
	chatPlaceholder: "Log splits, hits, ammo, gear notes…",
	productBadge: "Training day workflow",
	productHeading: "From assigned drill to qualified score — one connected system.",
	productBody:
		"Instructors assign marksmanship, CQB, physical, and qualification drills. Operators log with timers on mobile — even offline. Weapon, attachment, and accuracy history show what made performance better or worse.",
	whyLabel: "Why Tactical OS",
	whyHeading: "Training orgs deserve more than spreadsheets and paper logs.",
	whySub:
		"Multi-tenant academies, role-based access, offline-first mobile, and performance data you can trust — not HR software or generic fitness apps.",
	capabilitiesBadge: "Platform",
	capabilitiesHeading: "Everything a training academy needs to run and measure drills.",
	capabilitiesBody:
		"Assign drills, capture timers and scores, track weapons and attachments, sync from the field, and review readiness on web — built for instructors, operators, and planners.",
	customersTitle: "Drill disciplines supported from day one",
	ctaBadge: "Early access",
	ctaHeading: "Run your next training day on Tactical OS.",
	ctaBody:
		"Start with drill logging and timers. Grow into structured exercises, cohort dashboards, and multi-academy tenancy as your program scales.",
	pricingHeading: "Pricing that scales with your academy.",
	pricingBody:
		"Pilot free while we ship core drill logging. Paid tiers add cohorts, instructors, and isolated org tenants — no surprise overages.",
	aboutTitle: "About Tactical OS",
	aboutLead:
		"Tactical OS is the operator training and readiness platform for academies — drills, weapons, performance, and mission-style exercise planning on one stack.",
} as const;

export const SECTION_LINKS = {
	heroPrimary: "#product",
	heroSecondary: "http://localhost:3002/docs",
	ctaPrimary: "#pricing",
} as const;

export type NavLink = {
	label: string;
	href: string;
};

export type NavSubItem = {
	label: string;
	description: string;
	href: string;
};

export type NavItem = {
	label: string;
	href: string;
	items?: NavSubItem[];
};

export const NAV_ITEMS: NavItem[] = [
	{
		label: "Platform",
		href: "#product",
		items: [
			{
				label: "Drill workflow",
				description: "Assign, run, log, and review training sessions",
				href: "/#product",
			},
			{
				label: "Capabilities",
				description: "Timers, weapons, offline sync, and dashboards",
				href: "/#capabilities",
			},
			{
				label: "Why Tactical OS",
				description: "Built for academies, not generic SaaS",
				href: "/#why",
			},
		],
	},
	{
		label: "Resources",
		href: "#faq",
		items: [
			{
				label: "Docs",
				description: "Engineering and product documentation",
				href: "http://localhost:3002/docs",
			},
			{
				label: "Drill types",
				description: "Marksmanship, CQB, physical, qualification",
				href: "/#customers",
			},
			{
				label: "About",
				description: "Mission, roles, and roadmap",
				href: "/about",
			},
		],
	},
	{ label: "Pricing", href: "/pricing" },
	{ label: "About", href: "/about" },
];

export type HeroAvatar = {
	seed: string;
	alt: string;
};

export const HERO_AVATARS: HeroAvatar[] = [
	{ seed: "Aria", alt: "Aria" },
	{ seed: "Milo", alt: "Milo" },
	{ seed: "Juno", alt: "Juno" },
	{ seed: "Remy", alt: "Remy" },
];

export type WorkflowStep = {
	id: string;
	label: string;
	detail: string;
};

export const WORKFLOW_STEPS: WorkflowStep[] = [
	{
		id: "assign",
		label: "Drill assigned",
		detail: "Instructor · CQB room 3 · 09:00",
	},
	{
		id: "timer",
		label: "Timer running",
		detail: "Split 1 · 1.42s · mobile offline",
	},
	{
		id: "weapon",
		label: "Weapon logged",
		detail: "Carbine · red-dot · 24 rounds",
	},
	{
		id: "score",
		label: "Score captured",
		detail: "Hits 18/20 · accuracy 90%",
	},
	{
		id: "sync",
		label: "Synced to command",
		detail: "Readiness board updated",
	},
];

export type ChatMessage = {
	role: "user" | "agent";
	text: string;
};

export const AGENT_MESSAGES: ChatMessage[] = [
	{
		role: "user",
		text: "Log today's CQB drill — compare splits to last week and note the optic change.",
	},
	{
		role: "agent",
		text: "Logged. Split average is 8% faster than your last CQB session.",
	},
	{
		role: "agent",
		text: "Weapon profile updated: red-dot mount changed — accuracy up 4% over 5 sessions.",
	},
	{
		role: "agent",
		text: "Qualification threshold met. Instructor review queue updated.",
	},
];

export type CustomerLogo = {
	name: string;
	icon: IconSvgElement;
};

export const CUSTOMER_LOGOS: CustomerLogo[] = [
	{ name: "Marksmanship", icon: ApertureIcon },
	{ name: "CQB", icon: SecurityCheckIcon },
	{ name: "Physical", icon: TriangleIcon },
	{ name: "Qualification", icon: HexagonIcon },
	{ name: "Custom drills", icon: CommandIcon },
	{ name: "Offline mobile", icon: OctagonIcon },
];

export const PRODUCT_BULLETS: string[] = [
	"Instructor-assigned drills with built-in timers and manual score entry",
	"Weapon, attachment, and ammo logged every session — see what changed performance",
	"Marksmanship, CQB, physical, qualification, and custom drill templates",
	"Offline mobile capture at the range; sync when signal returns",
	"Multi-tenant academies with operator, instructor, and planner roles",
];

export type IncidentEvent = {
	title: string;
	detail: string;
	tone: "info" | "ok";
	icon: "activity" | "search" | "pr" | "wrench" | "shield";
};

export const INCIDENT_TIMELINE: IncidentEvent[] = [
	{
		title: "Brief issued",
		detail: "OPORD-lite · objectives · gear list · linked drills",
		tone: "info",
		icon: "activity",
	},
	{
		title: "Operators deploy",
		detail: "Mobile app · offline queue enabled",
		tone: "info",
		icon: "search",
	},
	{
		title: "Drills executed",
		detail: "Timers · hits/misses · weapon snapshots",
		tone: "info",
		icon: "wrench",
	},
	{
		title: "Scores sync",
		detail: "Cohort dashboard · delta vs last session",
		tone: "info",
		icon: "pr",
	},
	{
		title: "Readiness reviewed",
		detail: "Instructor sign-off · qualification status",
		tone: "ok",
		icon: "shield",
	},
];

export type ToolCall = {
	name: string;
	status: "done" | "running";
};

export const AGENT_TOOL_CALLS: ToolCall[] = [
	{ name: "sync drill sessions", status: "done" },
	{ name: "compute split delta", status: "done" },
	{ name: "flag qualification pass", status: "running" },
];

export type CapabilityCard = {
	title: string;
	description: string;
	span: 2 | 4;
	kind: "reasoning" | "tools" | "memory" | "output" | "approval";
	palette: MeshPalette;
};

export type MeshPalette = "blue" | "teal" | "lime" | "amber";

export const CAPABILITY_CARDS: CapabilityCard[] = [
	{
		title: "Drill logging & timers",
		description:
			"Assign marksmanship, CQB, physical, and qualification drills. Built-in timers and manual score entry — no stopwatch apps on the side.",
		span: 4,
		kind: "reasoning",
		palette: "lime",
	},
	{
		title: "Weapon & accuracy history",
		description:
			"Log weapon, attachments, ammo, and hits per session. See how gear changes correlate with split times over weeks.",
		span: 2,
		kind: "tools",
		palette: "amber",
	},
	{
		title: "Offline-first mobile",
		description:
			"Capture drills at the range without signal. Local queue syncs when connectivity returns.",
		span: 2,
		kind: "memory",
		palette: "teal",
	},
	{
		title: "Instructor dashboards",
		description:
			"Cohort readiness, session deltas, and qualification status on web — operators see their own progress.",
		span: 2,
		kind: "output",
		palette: "blue",
	},
	{
		title: "Multi-tenant academies",
		description:
			"Isolated orgs with units and cohorts. Roles for operators, instructors, planners, and org admins.",
		span: 2,
		kind: "approval",
		palette: "lime",
	},
];

export type Stat = {
	value: number;
	suffix: string;
	prefix: string;
	label: string;
	display?: string;
	detail?: string;
};

export const STATS: Stat[] = [
	{
		value: 5,
		suffix: "",
		prefix: "",
		label: "Drill categories",
		detail: "Marksmanship · CQB · physical · qual · custom",
	},
	{
		value: 3,
		suffix: "",
		prefix: "",
		label: "Core roles",
		detail: "Operator · instructor · planner",
	},
	{
		value: 100,
		suffix: "%",
		prefix: "",
		label: "Session traceability",
		detail: "Weapon · ammo · score · timestamp",
	},
	{
		value: 0,
		suffix: "",
		prefix: "",
		label: "Signal required",
		display: "Offline",
		detail: "Mobile capture · background sync",
	},
];

export type AboutPrinciple = {
	title: string;
	description: string;
	icon: "bridge" | "eye" | "shield";
};

export const ABOUT_PRINCIPLES: AboutPrinciple[] = [
	{
		icon: "bridge",
		title: "Training-first, not generic SaaS",
		description:
			"Every feature earns its place by helping academies run drills and prove readiness — not another HR or fitness app.",
	},
	{
		icon: "eye",
		title: "Data operators can trust",
		description:
			"Weapon history, split deltas, and qualification status — visible to instructors and operators without spreadsheet archaeology.",
	},
	{
		icon: "shield",
		title: "Field-ready by default",
		description:
			"Offline mobile, role-based access, and multi-tenant isolation — built for ranges and training floors, not just desk dashboards.",
	},
];

export type AboutTeamMember = {
	id: string;
	name: string;
	role: string;
	seed: string;
	bio: string;
	tone: "green" | "teal" | "blue" | "amber";
	profileHref: string;
};

export const ABOUT_TEAM: AboutTeamMember[] = [
	{
		id: "alex",
		name: "Alex Mercer",
		role: "Head instructor",
		seed: "AlexMercer",
		bio: "Runs CQB and qualification programs. Wants every drill logged with the same rigor as a live op brief.",
		tone: "green",
		profileHref: "#",
	},
	{
		id: "sam",
		name: "Sam Rivera",
		role: "Range operations",
		seed: "SamRivera",
		bio: "Keeps mobile offline sync honest. Obsessed with zero lost sessions when signal drops at the range.",
		tone: "teal",
		profileHref: "#",
	},
	{
		id: "jordan",
		name: "Jordan Hale",
		role: "Readiness analytics",
		seed: "JordanHale",
		bio: "Builds instructor dashboards and split deltas so cohorts improve week over week, not guesswork.",
		tone: "blue",
		profileHref: "#",
	},
	{
		id: "casey",
		name: "Casey Wu",
		role: "Platform & mobile",
		seed: "CaseyWu",
		bio: "Web command center plus Expo field app. Believes training software should work where operators actually train.",
		tone: "amber",
		profileHref: "#",
	},
];

export type Testimonial = {
	quote: string;
	name: string;
	role: string;
	seed: string;
};

export const TESTIMONIALS_ROW_ONE: Testimonial[] = [
	{
		quote:
			"We replaced three spreadsheets and a WhatsApp group. Every CQB session is timed, scored, and synced before instructors leave the range.",
		name: "Maya Chen",
		role: "Academy lead, urban tactics",
		seed: "Maya",
	},
	{
		quote:
			"Offline mobile was the dealbreaker. Operators log splits in the kill house; dashboards update when they hit Wi‑Fi.",
		name: "Diego Santos",
		role: "Range master",
		seed: "Diego",
	},
	{
		quote:
			"Weapon and optic changes finally show up in the data. Split times improved 12% once we could see attachment history.",
		name: "Priya Nair",
		role: "Marksmanship instructor",
		seed: "Priya",
	},
];

export const TESTIMONIALS_ROW_TWO: Testimonial[] = [
	{
		quote:
			"Multi-tenant setup let us run two cohorts under one org without cross-contamination. Qualification records stay clean.",
		name: "Theo Park",
		role: "Training director",
		seed: "Theo",
	},
	{
		quote:
			"Instructors assign drills in the morning; operators execute with built-in timers. No more arguing about stopwatch apps.",
		name: "Lena Ortiz",
		role: "CQB program lead",
		seed: "Lena",
	},
	{
		quote:
			"Readiness board on web, field app on mobile — same product, same truth. That's what our accreditation reviewers wanted.",
		name: "Maya Chen",
		role: "Academy lead, urban tactics",
		seed: "MayaTwo",
	},
];

export type TerminalLine = {
	text: string;
	tone: "prompt" | "muted" | "ok" | "info";
};

export const DEPLOY_TERMINAL: TerminalLine[] = [
	{ text: "assign drill --cohort alpha --type cqb", tone: "prompt" },
	{ text: "Operators receive session on mobile (offline OK)", tone: "ok" },
	{ text: "timer start · splits captured · weapon logged", tone: "info" },
	{ text: "sync --when online → instructor dashboard", tone: "ok" },
];

export type PricingTier = {
	services: number | "unlimited";
	monthly: number;
};

/** Slider steps: pilot → academy → multi-unit → enterprise. */
export const PRICING_TIERS: PricingTier[] = [
	{ services: 1, monthly: 0 },
	{ services: 5, monthly: 49 },
	{ services: 15, monthly: 149 },
	{ services: 50, monthly: 399 },
	{ services: "unlimited", monthly: 799 },
];

export const PRICING_FEATURES: string[] = [
	"Drill templates, timers, and manual score entry",
	"Weapon, attachment, and ammo history per session",
	"Offline mobile with background sync",
	"Instructor dashboards and cohort readiness",
	"Multi-tenant org isolation (paid tiers)",
];

export type WhyCard = {
	id: string;
	title: string;
	description: string;
	palette: MeshPalette;
	kind: "route" | "keys" | "ready";
};

export const WHY_CARDS: WhyCard[] = [
	{
		id: "route",
		title: "One system for the training day",
		description:
			"Assign drills, run timers, log weapons, sync scores, and review readiness — web command and mobile field in one product.",
		palette: "lime",
		kind: "route",
	},
	{
		id: "keys",
		title: "Roles that match your org",
		description:
			"Operators, instructors, planners, and org admins — each sees what they need without spreadsheet sprawl.",
		palette: "amber",
		kind: "keys",
	},
	{
		id: "ready",
		title: "Works at the range",
		description:
			"Offline-first mobile capture with background sync — no lost sessions when signal drops mid-drill.",
		palette: "teal",
		kind: "ready",
	},
];

export type FaqItem = {
	id: string;
	question: string;
	answer: string;
	icon: IconSvgElement;
};

export const FAQ_ITEMS: FaqItem[] = [
	{
		id: "offline",
		question: "Does mobile work offline at the range?",
		answer:
			"Yes. Operators log drills, timers, and scores locally. When connectivity returns, sessions sync to the instructor dashboard in the background.",
		icon: HexagonIcon,
	},
	{
		id: "drills",
		question: "What drill types are supported?",
		answer:
			"Marksmanship, CQB, physical, qualification, and custom templates. MVP focuses on logging and timers; structured OPORD-lite exercise planning is on the roadmap.",
		icon: SecurityCheckIcon,
	},
	{
		id: "weapons",
		question: "Can we track weapons and attachments over time?",
		answer:
			"Every session can log weapon, attachments, ammo, and accuracy. History shows how gear changes correlate with splits and hit rates across weeks.",
		icon: ApertureIcon,
	},
	{
		id: "tenants",
		question: "Is this multi-tenant for training academies?",
		answer:
			"Yes. Orgs are isolated with units and cohorts inside. Role-based access for operators, instructors, planners, and org admins.",
		icon: CommandIcon,
	},
	{
		id: "pricing",
		question: "Is there a free tier?",
		answer:
			"Pilot tier is free while core drill logging ships. Paid tiers add more operators, instructors, and dedicated org tenancy — annual billing includes two months free.",
		icon: GemIcon,
	},
	{
		id: "redcore",
		question: "Is Tactical OS the same as RedCore?",
		answer:
			"No. Tactical OS is training and readiness for academies. RedCore is a separate evidence-first cyber ops product — different domain, different repo.",
		icon: OctagonIcon,
	},
];

export type FooterColumn = {
	title: string;
	links: NavLink[];
};

export const FOOTER_COLUMNS: FooterColumn[] = [
	{
		title: "Product",
		links: [
			{ label: "Training workflow", href: "/#product" },
			{ label: "Capabilities", href: "/#capabilities" },
			{ label: "Pricing", href: "/pricing" },
		],
	},
	{
		title: "Resources",
		links: [
			{ label: "Docs", href: "http://localhost:3002/docs" },
			{ label: "Drill types", href: "/#customers" },
			{ label: "FAQ", href: "/#faq" },
			{ label: "Roadmap", href: "/#deploy" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About", href: "/about" },
			{ label: "Contact", href: "/about" },
		],
	},
];

export function dicebearUrl(seed: string): string {
	return `https://api.dicebear.com/10.x/glass/svg?seed=${encodeURIComponent(seed)}`;
}
