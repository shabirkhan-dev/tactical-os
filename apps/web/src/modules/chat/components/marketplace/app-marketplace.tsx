import { AutomationBanner } from "@/modules/chat/components/marketplace/automation-banner";
import { FeaturedAppGrid } from "@/modules/chat/components/marketplace/featured-app-grid";
import { MarketplaceSearch } from "@/modules/chat/components/marketplace/marketplace-search";

export function AppMarketplace() {
	return (
		<main className="marketplace">
			<section className="marketplace__inner">
				<div className="dot-field" />
				<h1>Connect the tools your team already uses</h1>

				<MarketplaceSearch />
				<AutomationBanner />

				<h2>Featured</h2>
				<FeaturedAppGrid />
			</section>
		</main>
	);
}
