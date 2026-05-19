import { h, mount } from "../../lib/dom";
import { SideBarElement } from "./components/sidebar/sidebar";
import "./dashboard.css";

function DashboardView(): HTMLElement {
	return h("div", { className: "dashboard" }, [
		h("div", { id: "sidebar-root" }, [SideBarElement()]),
		h("div", { className: "dashboard-content" }, [h("h1", { className: "title" }, "Dashboard")]),
	]);
}

export function Dashboard(): void {
	const root = document.getElementById("dashboard-root");
	if (!root) return;
	mount(root, DashboardView());
}
