import type { ReactNode } from "react";

type AccountPanelProps = {
	title: string;
	description: string;
	children: ReactNode;
	action?: ReactNode;
};

export function AccountPanel({ title, description, children, action }: AccountPanelProps) {
	return (
		<section className="account-panel">
			<div className="account-panel__header">
				<div>
					<h2>{title}</h2>
					<p>{description}</p>
				</div>
				{action}
			</div>
			<div className="account-panel__body">{children}</div>
		</section>
	);
}

export function AccountRow({ label, value }: { label: string; value: ReactNode }) {
	return (
		<div className="account-row">
			<span className="account-row__label">{label}</span>
			<span className="account-row__value">{value}</span>
		</div>
	);
}
