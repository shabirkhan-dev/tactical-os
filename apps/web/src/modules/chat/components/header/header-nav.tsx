import { headerTabs } from "@/modules/chat/components/header/header.data";
import { HeaderHugeIcon } from "@/modules/chat/components/header/huge-icon";

export function HeaderNav() {
	return (
		<nav className="top-nav" aria-label="Primary">
			{headerTabs.map(({ label, icon, active }) => (
				<button
					className={active ? "top-nav__item is-active" : "top-nav__item"}
					type="button"
					key={label}
				>
					<HeaderHugeIcon icon={icon} />
					<span>{label}</span>
				</button>
			))}
		</nav>
	);
}
