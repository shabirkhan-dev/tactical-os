import { useEffect } from "react";

import { setupSteps } from "@/modules/chat/components/welcome/welcome.data";
import { WelcomeHugeIcon } from "@/modules/chat/components/welcome/welcome-icon";

type WelcomeModalProps = {
	onClose: () => void;
};

export function WelcomeModal({ onClose }: WelcomeModalProps) {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [onClose]);

	return (
		<div className="welcome-modal-backdrop" role="presentation">
			<button
				className="welcome-modal-backdrop__dismiss"
				type="button"
				tabIndex={-1}
				aria-label="Close welcome dialog"
				onClick={onClose}
			/>
			<section
				className="welcome-modal"
				role="dialog"
				aria-modal="true"
				aria-labelledby="welcome-modal-title"
			>
				<section className="welcome-modal__preview" aria-label="Workspace setup progress">
					<div className="welcome-modal__setup-card">
						<div className="window-dots" aria-hidden="true">
							<span className="window-dot window-dot--red" />
							<span className="window-dot window-dot--yellow" />
							<span className="window-dot window-dot--green" />
						</div>
						<div className="welcome-modal__steps">
							{setupSteps.map(({ label, icon }) => (
								<div className="setup-step" key={label}>
									<WelcomeHugeIcon icon={icon} />
									<span>{label}</span>
								</div>
							))}
						</div>
					</div>
				</section>

				<div className="welcome-modal__body">
					<h2 id="welcome-modal-title">Welcome to Alpaca</h2>
					<p>
						Your AI workspace is ready to build, automate, explore tools, and run intelligent
						workflows locally.
					</p>
					<button className="welcome-modal__action" type="button" onClick={onClose}>
						Explore
					</button>
				</div>
			</section>
		</div>
	);
}
