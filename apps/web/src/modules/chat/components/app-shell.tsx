"use client";

import { useRouter } from "next/navigation";

import { AccountProfileScreen } from "@/modules/chat/components/account/account-profile-screen";
import { AccountSecurityScreen } from "@/modules/chat/components/account/account-security-screen";
import { NewChatScreen } from "@/modules/chat/components/chat";
import { AppHeader } from "@/modules/chat/components/header";
import { AppMarketplace } from "@/modules/chat/components/marketplace";
import { AppSidebar } from "@/modules/chat/components/sidebar";
import { WelcomeScreen } from "@/modules/chat/components/welcome";

export type ChatView = "apps" | "chat" | "welcome" | "profile" | "security";

type AppShellProps = {
	activeView?: ChatView;
};

export function AppShell({ activeView = "apps" }: AppShellProps) {
	const router = useRouter();

	const handlePrimaryItemSelect = (label: string) => {
		if (label === "Welcome") {
			router.push("/chat/welcome");
			return;
		}

		if (label === "New chat") {
			router.push("/chat/new-chat");
			return;
		}

		if (label === "Apps") {
			router.push("/chat");
		}
	};

	const activeSidebarItem = {
		apps: "Apps",
		chat: "New chat",
		welcome: "Welcome",
		profile: "",
		security: "",
	}[activeView];

	const activeScreen = {
		apps: <AppMarketplace />,
		chat: <NewChatScreen />,
		welcome: <WelcomeScreen />,
		profile: <AccountProfileScreen />,
		security: <AccountSecurityScreen />,
	}[activeView];

	return (
		<div className="chat-design-system" data-chat-design-system data-theme="light">
			<div className="page">
				<div className="product-frame">
					<AppHeader />
					<div className="workspace">
						<AppSidebar
							activeItem={activeSidebarItem}
							onPrimaryItemSelect={handlePrimaryItemSelect}
						/>
						{activeScreen}
					</div>
				</div>
			</div>
		</div>
	);
}
