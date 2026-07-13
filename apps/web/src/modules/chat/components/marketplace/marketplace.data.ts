import type { AppBrandKey } from "@/modules/chat/components/brand-icons";

export type MarketplaceApp = {
	name: string;
	description: string;
	brand: AppBrandKey;
	connected?: boolean;
};

export type AutomationExample = {
	brand: Extract<AppBrandKey, "slack" | "github" | "gmail">;
	label: string;
	description: string;
	widthClass: string;
};

export const marketplaceApps: MarketplaceApp[] = [
	{
		name: "X (formerly Twitter)",
		description: "Interact with X for social media mana...",
		brand: "x",
		connected: true,
	},
	{
		name: "GitHub",
		description: "Streamline your development workflow",
		brand: "github",
	},
	{
		name: "Slack",
		description: "Facilitate team communication and c...",
		brand: "slack",
	},
	{
		name: "Asana",
		description: "Manage project tasks and deadlines...",
		brand: "asana",
	},
	{
		name: "Zoom",
		description: "Host virtual meetings and webinars e...",
		brand: "zoom",
	},
	{
		name: "Trello",
		description: "Organize projects with boards and ca...",
		brand: "trello",
	},
	{
		name: "Figma",
		description: "Design and prototype collaboratively...",
		brand: "figma",
	},
	{
		name: "Notion",
		description: "Create documents and databases for...",
		brand: "notion",
	},
	{
		name: "Canva",
		description: "Design graphics and presentations wi...",
		brand: "canva",
	},
	{
		name: "Dropbox",
		description: "Store and share files securely in the c...",
		brand: "dropbox",
	},
];

export const automationExamples: AutomationExample[] = [
	{
		brand: "slack",
		label: "Slack",
		description: "Summarize key updates from recent conversations",
		widthClass: "automation-pill--one",
	},
	{
		brand: "github",
		label: "GitHub",
		description: "Review open issues and pull request activity",
		widthClass: "automation-pill--two",
	},
	{
		brand: "gmail",
		label: "Gmail",
		description: "Draft replies for every email I'm behind on",
		widthClass: "automation-pill--three",
	},
];
