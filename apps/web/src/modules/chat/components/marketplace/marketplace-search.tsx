import { Search01Icon } from "@hugeicons/core-free-icons";

import { MarketplaceHugeIcon } from "@/modules/chat/components/marketplace/marketplace-icon";

export function MarketplaceSearch() {
	return (
		<label className="market-search">
			<MarketplaceHugeIcon icon={Search01Icon} />
			<input aria-label="Search marketplace" placeholder="Search marketplace..." />
		</label>
	);
}
