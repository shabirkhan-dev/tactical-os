import { h, mount } from "../../../../lib/dom";
import "./sidebar.css";

type TeamSwitcherElementType = {
	name: string;
};
export const TeamSwitcherElement = ({ name }: TeamSwitcherElementType) => {
	return h("div", { className: "team-switcher" }, [
		h(
			"div",
			{
				class: "team-icon",
			},
			[
				h("img", {
					src: "/images/team-icon.png",
					alt: "T",
					width: 24,
					height: 24,
				}),
			],
		),
		h(
			"div",
			{
				class: "name",
			},
			[h("h3", { class: "team-name" }, name)],
		),
	]);
};

export function TeamSwitcher({ name }: TeamSwitcherElementType): void {
	const root = document.getElementById("team-switcher-root");
	if (!root) return;
	mount(root, TeamSwitcherElement({ name }));
}
