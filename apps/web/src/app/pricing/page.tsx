import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { AgentShell, atlasThemeScript, PricingSection } from "@/modules/landing";
import "@/modules/landing/styles/landing.css";

const jakarta = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-jakarta",
	display: "swap",
});

const fraunces = Fraunces({
	subsets: ["latin"],
	variable: "--font-fraunces",
	display: "swap",
});

const jetbrains = JetBrains_Mono({
	subsets: ["latin"],
	variable: "--font-jetbrains",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Pricing — Atlas",
	description:
		"Atlas is free on your first five services. Slide to your fleet size — no per-seat fees.",
};

export default function PricingPage() {
	return (
		<>
			<script
				// biome-ignore lint/security/noDangerouslySetInnerHtml: theme before paint
				dangerouslySetInnerHTML={{ __html: atlasThemeScript }}
			/>
			<div className={cn(jakarta.variable, fraunces.variable, jetbrains.variable)}>
				<AgentShell>
					<PricingSection />
				</AgentShell>
			</div>
		</>
	);
}
