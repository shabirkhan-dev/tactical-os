import {
	Aperture,
	Box,
	Circle,
	Command,
	Gem,
	Hexagon,
	type LucideIcon,
	Octagon,
	ShieldCheck,
	Triangle,
} from "lucide-react";

export const SITE = {
	name: "Atlas",
	title: "Atlas — the always-on engineering agent",
	description:
		"Atlas watches your services, finds the root cause, and ships the fix — before anyone files a ticket.",
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
		label: "Product",
		href: "#product",
		items: [
			{
				label: "Incident response",
				description: "Detect, triage, and resolve on autopilot",
				href: "/#product",
			},
			{
				label: "Root-cause tracing",
				description: "Every fix, fully explained and linked",
				href: "/#product",
			},
			{
				label: "Capabilities",
				description: "Tools, memory, and approvals wired in",
				href: "/#capabilities",
			},
		],
	},
	{
		label: "Resources",
		href: "#customers",
		items: [
			{
				label: "Docs",
				description: "Connect your services",
				href: "/#deploy",
			},
			{
				label: "Customers",
				description: "Teams running on Atlas",
				href: "/#customers",
			},
			{
				label: "About",
				description: "Who's behind Atlas",
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
		id: "anomaly",
		label: "Anomaly detected",
		detail: "p99 latency crossed 800ms on checkout-api",
	},
	{
		id: "investigating",
		label: "Agent investigating",
		detail: "Tracing slow spans and recent deploys",
	},
	{
		id: "root",
		label: "Root cause isolated",
		detail: "Database connection pool saturated",
	},
	{
		id: "fix",
		label: "Fix applied",
		detail: "Pool size raised, +2 replicas rolled out",
	},
	{
		id: "notify",
		label: "Team notified",
		detail: "Summary posted to #incidents",
	},
];

export type ChatMessage = {
	role: "user" | "agent";
	text: string;
};

export const AGENT_MESSAGES: ChatMessage[] = [
	{
		role: "user",
		text: "checkout-api is throwing latency alerts — take a look?",
	},
	{
		role: "agent",
		text: "p99 latency hit 920ms — pulling traces from the last deploy now.",
	},
	{
		role: "agent",
		text: "Root cause: the connection pool is saturated under peak load.",
	},
	{
		role: "agent",
		text: "Raised the pool size and added 2 replicas — latency is back to 180ms.",
	},
];

export type CustomerLogo = {
	name: string;
	icon: LucideIcon;
};

export const CUSTOMER_LOGOS: CustomerLogo[] = [
	{ name: "Northwind", icon: Hexagon },
	{ name: "Relay", icon: Triangle },
	{ name: "Cortex", icon: Aperture },
	{ name: "Ledger", icon: Box },
	{ name: "Beacon", icon: Gem },
	{ name: "Stacks", icon: Command },
	{ name: "Mosaic", icon: Octagon },
	{ name: "Pulse", icon: Circle },
];

export const PRODUCT_BULLETS: string[] = [
	"Reads logs, metrics, and traces across every service",
	"Ships low-risk fixes itself, escalates the rest",
	"Replayable timeline for every incident it touches",
];

export type IncidentEvent = {
	title: string;
	detail: string;
	tone: "info" | "ok";
	icon: "activity" | "search" | "pr" | "wrench" | "shield";
};

export const INCIDENT_TIMELINE: IncidentEvent[] = [
	{
		title: "Detected anomaly",
		detail: "checkout p99 latency ↑ 420ms",
		tone: "info",
		icon: "activity",
	},
	{
		title: "Found root cause",
		detail: "N+1 query introduced in deploy a3f9c2",
		tone: "info",
		icon: "search",
	},
	{
		title: "Opened PR #1284",
		detail: "add index, batch the cart fetch",
		tone: "info",
		icon: "pr",
	},
	{
		title: "Verified in staging",
		detail: "p99 back to 88ms, error rate flat",
		tone: "info",
		icon: "wrench",
	},
	{
		title: "Incident resolved",
		detail: "paged no one — full trace logged",
		tone: "ok",
		icon: "shield",
	},
];

export type ToolCall = {
	name: string;
	status: "done" | "running";
};

export const AGENT_TOOL_CALLS: ToolCall[] = [
	{ name: "web_search", status: "done" },
	{ name: "read_page", status: "done" },
	{ name: "send_email", status: "done" },
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
		title: "Watch the agent reason",
		description:
			"It plans, calls the right tools, and reports back — the full loop, streamed step by step.",
		span: 4,
		kind: "reasoning",
		palette: "blue",
	},
	{
		title: "Add a tool in one line",
		description:
			"Plug in any MCP server or function — the agent discovers and calls it automatically.",
		span: 2,
		kind: "tools",
		palette: "blue",
	},
	{
		title: "Remembers what matters",
		description: "Long-term memory and retrieval, baked in across runs.",
		span: 2,
		kind: "memory",
		palette: "teal",
	},
	{
		title: "Returns structured output",
		description: "Schema-valid, typed JSON every time — ready to use downstream.",
		span: 2,
		kind: "output",
		palette: "lime",
	},
	{
		title: "Pauses for approval",
		description: "Asks before risky actions — approve or edit each step.",
		span: 2,
		kind: "approval",
		palette: "blue",
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
		value: 92,
		suffix: "%",
		prefix: "",
		label: "Incidents auto-resolved",
		detail: "no one paged",
	},
	{
		value: 4,
		suffix: "min",
		prefix: "",
		label: "Median time to fix",
		detail: "down from 47",
	},
	{
		value: 0,
		suffix: "",
		prefix: "",
		label: "Always watching",
		display: "24/7",
		detail: "every service",
	},
	{
		value: 3,
		suffix: "k+",
		prefix: "",
		label: "Engineers off-call",
		detail: "sleeping again",
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
		title: "Reliability is the product",
		description:
			"Every feature earns its place by making on-call quieter. If it doesn’t reduce toil or pages, it doesn’t ship.",
	},
	{
		icon: "eye",
		title: "No black boxes",
		description:
			"The agent narrates every step and every fix it ships. You can always see exactly what it did and why.",
	},
	{
		icon: "shield",
		title: "Humans stay in control",
		description:
			"Risky actions pause for approval, scopes are tight, and you can pull the plug on any agent at any time.",
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
		id: "priya",
		name: "Priya Nair",
		role: "Co-founder & CEO",
		seed: "PriyaNair",
		bio: "Spent a decade on-call for global traffic. Built Atlas so no one else has to live that life.",
		tone: "green",
		profileHref: "#",
	},
	{
		id: "marcus",
		name: "Marcus Vale",
		role: "Co-founder & CTO",
		seed: "MarcusVale",
		bio: "Designs the agent runtime. Obsessed with traces that make every automated fix reviewable.",
		tone: "teal",
		profileHref: "#",
	},
	{
		id: "lena",
		name: "Lena Ortiz",
		role: "Head of Reliability",
		seed: "LenaOrtiz",
		bio: "Owns approval gates and blast-radius controls. Trust is the feature she’s shipping next.",
		tone: "blue",
		profileHref: "#",
	},
	{
		id: "theo",
		name: "Theo Park",
		role: "Head of Engineering",
		seed: "TheoPark",
		bio: "Turns messy production signals into clean, replayable traces. Believes a fix you can’t audit isn’t a fix.",
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
			"Atlas closed our first Sev-2 before the pager even finished buzzing. It's genuinely on-call now, not us.",
		name: "Maya Chen",
		role: "VP Engineering, Northwind",
		seed: "Maya",
	},
	{
		quote:
			"The root-cause writeups are better than what most of my engineers ship. Every fix comes with receipts.",
		name: "Diego Santos",
		role: "SRE Lead, Relay",
		seed: "Diego",
	},
	{
		quote:
			"We cut median resolution time from 40 minutes to under 5. Our on-call rotation finally sleeps.",
		name: "Priya Nair",
		role: "Platform Director, Cortex",
		seed: "Priya",
	},
];

export const TESTIMONIALS_ROW_TWO: Testimonial[] = [
	{
		quote:
			"Adding a new tool is one line. Atlas started using our internal deploy CLI the same afternoon.",
		name: "Theo Park",
		role: "Staff Engineer, Ledger",
		seed: "Theo",
	},
	{
		quote:
			"The approval gates are the reason we trust it in prod. Risky changes always wait for a human.",
		name: "Lena Ortiz",
		role: "Head of Reliability, Beacon",
		seed: "Lena",
	},
	{
		quote:
			"It watches everything, all the time. We stopped drowning in alerts and started shipping again.",
		name: "Maya Chen",
		role: "VP Engineering, Northwind",
		seed: "MayaTwo",
	},
];

export type TerminalLine = {
	text: string;
	tone: "prompt" | "muted" | "ok" | "info";
};

export const DEPLOY_TERMINAL: TerminalLine[] = [
	{ text: "npx atlas connect --provider aws", tone: "prompt" },
	{ text: "Resolving items from the beUI registry…", tone: "ok" },
	{ text: "Added chat-input · message-stream · tool-call", tone: "ok" },
	{ text: "Installed 3 components in 1.2s", tone: "ok" },
];

export type PricingTier = {
	services: number | "unlimited";
	monthly: number;
};

/** Slider steps: free → growth → scale (matches reference $149 @ 100 services). */
export const PRICING_TIERS: PricingTier[] = [
	{ services: 5, monthly: 0 },
	{ services: 25, monthly: 49 },
	{ services: 100, monthly: 149 },
	{ services: 500, monthly: 399 },
	{ services: "unlimited", monthly: 799 },
];

export const PRICING_FEATURES: string[] = [
	"Detect, diagnose & auto-fix",
	"Approval gates on risky actions",
	"Full replayable run traces",
	"PR + Slack + PagerDuty actions",
	"Custom runbooks & tools",
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
		title: "Diagnose across every service",
		description:
			"One pass reads logs, metrics, and traces across the stack — then picks the cheapest safe fix path.",
		palette: "blue",
		kind: "route",
	},
	{
		id: "keys",
		title: "Humans stay in control",
		description:
			"Risky actions pause for approval. Scopes stay tight, and you can pull the plug on any agent anytime.",
		palette: "lime",
		kind: "keys",
	},
	{
		id: "ready",
		title: "Watching in under a minute",
		description:
			"Connect a provider, import your services, and Atlas starts watching — no agents on every box.",
		palette: "amber",
		kind: "ready",
	},
];

export type FaqItem = {
	id: string;
	question: string;
	answer: string;
	icon: LucideIcon;
};

export const FAQ_ITEMS: FaqItem[] = [
	{
		id: "agents",
		question: "Do I need to install agents on every host?",
		answer:
			"No. Atlas connects through your cloud providers and observability stack — no agents on every box. Connect once, and it starts watching services across environments.",
		icon: Hexagon,
	},
	{
		id: "approvals",
		question: "Can humans stay in the loop for risky changes?",
		answer:
			"Yes. High-impact actions pause for approval by default. You set scopes per environment, and you can revoke an agent mid-run anytime.",
		icon: ShieldCheck,
	},
	{
		id: "stack",
		question: "Which tools and clouds does Atlas work with?",
		answer:
			"Atlas starts with the major clouds, log and metrics providers, and your existing ticketing workflows. Bring your runbooks and tools — Atlas learns the paths your team already trusts.",
		icon: Box,
	},
	{
		id: "traces",
		question: "How do we audit what the agent did?",
		answer:
			"Every run produces a full trace: signals read, hypotheses, actions taken, and evidence for the fix. Export it to your incident system or keep it in Atlas for postmortems.",
		icon: Command,
	},
	{
		id: "pricing",
		question: "How does pricing work as we scale?",
		answer:
			"Plans scale with seats and watched services. Start free, then upgrade when you need more environments, custom runbooks, or SSO. Annual billing includes two months free.",
		icon: Gem,
	},
	{
		id: "security",
		question: "How is our data handled?",
		answer:
			"Credentials stay scoped and short-lived. Atlas never stores secrets in traces, and enterprise plans include dedicated regions, audit exports, and custom retention.",
		icon: Octagon,
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
			{ label: "Incident agent", href: "/#product" },
			{ label: "Run traces", href: "/#product" },
			{ label: "Pricing", href: "/pricing" },
		],
	},
	{
		title: "Resources",
		links: [
			{ label: "Docs", href: "/#product" },
			{ label: "Customers", href: "/#customers" },
			{ label: "FAQ", href: "/#faq" },
			{ label: "Status", href: "/#product" },
		],
	},
	{
		title: "Company",
		links: [
			{ label: "About", href: "/about" },
			{ label: "Careers", href: "/about" },
			{ label: "Contact", href: "/about" },
		],
	},
];

export function dicebearUrl(seed: string): string {
	return `https://api.dicebear.com/10.x/glass/svg?seed=${encodeURIComponent(seed)}`;
}
