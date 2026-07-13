import { Add01Icon } from "@hugeicons/core-free-icons";

import { AppBrandIcon, connectApps } from "@/modules/chat/components/brand-icons";
import { SidebarHugeIcon } from "@/modules/chat/components/sidebar/sidebar-icon";

export function ConnectAppsCard() {
	return (
		<div className="sidebar-card">
			<h2>Connect apps</h2>
			<p>External apps such as Figma, Github, Drive</p>
			<div className="mini-icons">
				{connectApps.map(({ id, label, brand }) => (
					<button className="mini-icon" type="button" key={id} aria-label={label}>
						<AppBrandIcon brand={brand} size={11} />
					</button>
				))}
				<button className="mini-icon mini-icon--add" type="button" aria-label="Connect more apps">
					<SidebarHugeIcon icon={Add01Icon} size={11} />
				</button>
			</div>
		</div>
	);
}
