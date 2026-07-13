import { Message01Icon, Notification03Icon, UserAdd01Icon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

import { HeaderHugeIcon } from "@/modules/chat/components/header/huge-icon";
import { ThemeToggle } from "@/modules/chat/components/header/theme-toggle";

function HeaderIconButton({ label, icon }: { label: string; icon: IconSvgElement }) {
	return (
		<button className="icon-button" type="button" aria-label={label}>
			<HeaderHugeIcon icon={icon} />
		</button>
	);
}

export function HeaderActions() {
	return (
		<div className="top-actions">
			<ThemeToggle />
			<HeaderIconButton label="Notifications" icon={Notification03Icon} />
			<HeaderIconButton label="Messages" icon={Message01Icon} />
			<button className="invite-button" type="button">
				<HeaderHugeIcon icon={UserAdd01Icon} />
				<span>Invite</span>
			</button>
			<button className="avatar-button" type="button" aria-label="Account">
				<span />
			</button>
		</div>
	);
}
