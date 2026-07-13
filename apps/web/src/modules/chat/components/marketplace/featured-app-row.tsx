import { Add01Icon, Tick02Icon } from "@hugeicons/core-free-icons";

import { AppBrandIcon } from "@/modules/chat/components/brand-icons";
import type { MarketplaceApp } from "@/modules/chat/components/marketplace/marketplace.data";
import { MarketplaceHugeIcon } from "@/modules/chat/components/marketplace/marketplace-icon";

type FeaturedAppRowProps = {
	app: MarketplaceApp;
};

export function FeaturedAppRow({ app }: FeaturedAppRowProps) {
	const actionLabel = app.connected ? `${app.name} connected` : `Add ${app.name}`;

	return (
		<article className="app-row">
			<div className="app-logo" data-brand={app.brand}>
				<AppBrandIcon brand={app.brand} size={20} />
			</div>
			<div className="app-copy">
				<h3>{app.name}</h3>
				<p>{app.description}</p>
			</div>
			<button className="row-action" type="button" aria-label={actionLabel}>
				<MarketplaceHugeIcon icon={app.connected ? Tick02Icon : Add01Icon} />
			</button>
		</article>
	);
}
