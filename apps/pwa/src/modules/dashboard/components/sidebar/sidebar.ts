import "./sidebar.css";
import { h, mount } from "../../../../lib/dom";
import { TeamSwitcherElement } from "./team-switcher";
export const SideBarElement = () => {
	return h("nav", { className: "sidebar" }, [
		h("div", { className: "sidebar-header" }, [TeamSwitcherElement({ name: "Revoxia" })]),
		h("div", { className: "sidebar-content" }, [
			h("h2", { className: "sidebar-content-title" }, "Content"),
			h("p", { className: "sidebar-content-description" }, "Description"),
		]),
	]);
};

export function SideBar(): void {
	const root = document.getElementById("sidebar-root");
	if (!root) return;
	mount(root, SideBarElement());
}
