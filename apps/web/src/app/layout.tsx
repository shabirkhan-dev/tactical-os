import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
	title: {
		default: "Starter",
		template: "%s | Starter",
	},
	description: "Production-ready application starter",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="antialiased" suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
