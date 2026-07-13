import { AppBrandIcon } from "@/modules/chat/components/brand-icons";
import { automationExamples } from "@/modules/chat/components/marketplace/marketplace.data";

export function AutomationBanner() {
	return (
		<section className="feature-banner" aria-label="App automation examples">
			{automationExamples.map(({ brand, label, description, widthClass }) => (
				<div className={`automation-pill ${widthClass}`} key={brand}>
					<span className={`brand-badge brand-badge--${brand}`}>
						<AppBrandIcon brand={brand} size={17} className="brand-glyph" />
						<strong>{label}</strong>
					</span>
					<span className="automation-pill__text">{description}</span>
				</div>
			))}
		</section>
	);
}
