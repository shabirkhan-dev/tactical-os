import { FeaturedAppRow } from "@/modules/chat/components/marketplace/featured-app-row";
import { marketplaceApps } from "@/modules/chat/components/marketplace/marketplace.data";

export function FeaturedAppGrid() {
	return (
		<div className="app-grid">
			{marketplaceApps.map((app) => (
				<FeaturedAppRow app={app} key={app.name} />
			))}
		</div>
	);
}
