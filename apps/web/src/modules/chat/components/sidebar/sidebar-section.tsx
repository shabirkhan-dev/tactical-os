import type { SidebarItemData } from "@/modules/chat/components/sidebar/sidebar.types";
import { SidebarItem } from "@/modules/chat/components/sidebar/sidebar-item";

type SidebarSectionProps = {
	label?: string;
	items: SidebarItemData[];
	activeLabel?: string;
	onItemSelect?: (label: string) => void;
};

export function SidebarSection({ label, items, activeLabel, onItemSelect }: SidebarSectionProps) {
	return (
		<div className="sidebar__section">
			{label ? <p className="sidebar__label">{label}</p> : null}
			{items.map((item) => (
				<SidebarItem
					key={item.label}
					{...item}
					active={item.label === activeLabel}
					onSelect={onItemSelect}
				/>
			))}
		</div>
	);
}
