import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { themeInitScript } from "@/components/theme";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://github.com/shabirkhan-dev/tactical-os"),
	title: {
		default: "Tactical OS",
		template: "%s | Tactical OS",
	},
	description: "Operator training and readiness platform — mission planning, drills, response metrics, firing speed, and gear inventory for ops personnel.",
	keywords: ["tactical-os", "operator-training", "military", "drills", "readiness", "mission-planning", "inventory", "special-forces", "nextjs", "expo"],
	applicationName: "Tactical OS",
	creator: "Tactical OS",
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "Tactical OS",
		title: "Tactical OS — operator readiness",
		description: "Operator training and readiness platform — mission planning, drills, response metrics, firing speed, and gear inventory for ops personnel.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Tactical OS — operator readiness",
		description: "Operator training and readiness platform — mission planning, drills, response metrics, firing speed, and gear inventory for ops personnel.",
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={inter.variable} suppressHydrationWarning>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: static FOUC bootstrap, not user input */}
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="font-sans antialiased" suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
