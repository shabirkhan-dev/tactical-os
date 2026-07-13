import { Search01Icon } from "@hugeicons/core-free-icons";

import { HeaderHugeIcon } from "@/modules/chat/components/header/huge-icon";

export function HeaderSearch() {
	return (
		<label className="global-search">
			<HeaderHugeIcon icon={Search01Icon} />
			<input aria-label="Search" placeholder="Search" />
			<span className="search-shortcut" aria-hidden="true">
				⌘K
			</span>
		</label>
	);
}
