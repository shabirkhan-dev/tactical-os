import { Folder01Icon } from "@hugeicons/core-free-icons";

import { ConnectAppsCard } from "@/modules/chat/components/sidebar/connect-apps-card";
import { RecentSection } from "@/modules/chat/components/sidebar/recent-section";
import {
	primarySidebarItems,
	projectSidebarItems,
	recentSidebarItems,
} from "@/modules/chat/components/sidebar/sidebar.data";
import type { SidebarItemData } from "@/modules/chat/components/sidebar/sidebar.types";
import { SidebarSection } from "@/modules/chat/components/sidebar/sidebar-section";

const projectItems: SidebarItemData[] = projectSidebarItems.map((label) => ({
	label,
	icon: Folder01Icon,
}));

type AppSidebarProps = {
	activeItem: string;
	onPrimaryItemSelect: (label: string) => void;
};

export function AppSidebar({ activeItem, onPrimaryItemSelect }: AppSidebarProps) {
	return (
		<aside className="sidebar">
			<SidebarSection
				activeLabel={activeItem}
				items={primarySidebarItems}
				onItemSelect={onPrimaryItemSelect}
			/>
			<SidebarSection label="Projects" items={projectItems} />
			<RecentSection items={recentSidebarItems} />
			<ConnectAppsCard />
		</aside>
	);
}
