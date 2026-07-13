import { setupSteps } from "@/modules/chat/components/welcome/welcome.data";
import { WelcomeHugeIcon } from "@/modules/chat/components/welcome/welcome-icon";

export function SetupCard() {
	return (
		<section className="setup-card" aria-label="Workspace setup progress">
			<div className="window-dots" aria-hidden="true">
				<span className="window-dot window-dot--red" />
				<span className="window-dot window-dot--yellow" />
				<span className="window-dot window-dot--green" />
			</div>
			<div className="setup-card__steps">
				{setupSteps.map(({ label, icon }) => (
					<div className="setup-step" key={label}>
						<WelcomeHugeIcon icon={icon} />
						<span>{label}</span>
					</div>
				))}
			</div>
		</section>
	);
}
