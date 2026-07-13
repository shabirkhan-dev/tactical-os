import { HeaderActions } from "@/modules/chat/components/header/header-actions";
import { HeaderNav } from "@/modules/chat/components/header/header-nav";
import { HeaderSearch } from "@/modules/chat/components/header/header-search";
import { AceMarkIcon } from "@/modules/chat/components/icons";

export function AppHeader() {
	return (
		<header className="top-bar">
			<div className="top-bar__left">
				<button className="mark-button" type="button" aria-label="Ace home">
					<AceMarkIcon size={16} />
				</button>

				<HeaderNav />
			</div>

			<HeaderSearch />
			<HeaderActions />
		</header>
	);
}
