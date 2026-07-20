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
	description:
		"Tactical OS — operator training and readiness: plans, drills, performance, and inventory.",
	keywords: ["tactical-os", "tactical", "operations", "bun", "turborepo", "monorepo", "nextjs", "nestjs", "expo", "typescript", "fullstack", "docker"],
	applicationName: "Tactical OS",
	creator: "Tactical OS",
	openGraph: {
		type: "website",
		locale: "en_US",
		siteName: "Tactical OS",
		title: "Tactical OS",
		description:
			"Tactical OS — operator training and readiness: plans, drills, performance, and inventory.",
	},
	twitter: {
		card: "summary_large_image",
		title: "Tactical OS",
		description:
			"Tactical OS — operator training and readiness: plans, drills, performance, and inventory.",
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
