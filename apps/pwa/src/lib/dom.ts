/**
 * Tiny DOM helpers: compose trees like React, without JSX or a runtime.
 * Components return `HTMLElement`; `mount` attaches a single root node.
 */

export type DOMChild = string | number | Node | DOMChild[] | null | undefined | false;

export type HAttrs = {
	className?: string;
	id?: string;
	role?: string;
	title?: string;
	/** Any other string/number/boolean becomes an attribute (camelCase → kebab-case). */
	[key: string]: unknown;
};

function flatten(children: DOMChild[]): Array<string | number | Node> {
	const out: Array<string | number | Node> = [];
	for (const c of children) {
		if (c == null || c === false) continue;
		if (Array.isArray(c)) out.push(...flatten(c));
		else out.push(c);
	}
	return out;
}

function camelToAttr(name: string): string {
	return name.replace(/[A-Z]/g, (ch) => `-${ch.toLowerCase()}`);
}

function appendChildren(el: HTMLElement, children: DOMChild[]): void {
	for (const child of flatten(children)) {
		if (typeof child === "string" || typeof child === "number") {
			el.append(document.createTextNode(String(child)));
		} else {
			el.append(child);
		}
	}
}

function applyAttrs(el: HTMLElement, attrs: HAttrs): void {
	for (const [key, value] of Object.entries(attrs)) {
		if (value == null || value === false) continue;

		if (key === "className") {
			el.className = String(value);
			continue;
		}
		if (key === "id") {
			el.id = String(value);
			continue;
		}
		if (key === "role") {
			el.setAttribute("role", String(value));
			continue;
		}
		if (key === "title") {
			el.title = String(value);
			continue;
		}
		if (key.startsWith("on") && typeof value === "function") {
			const type = key.slice(2).toLowerCase();
			el.addEventListener(type, value as EventListener);
			continue;
		}
		if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
			el.setAttribute(camelToAttr(key), String(value));
		}
	}
}

/**
 * Create an element, apply attributes and listeners, append children.
 * Event props follow the `onClick` / `onInput` pattern (DOM event type is lowercased from the suffix).
 */
export function h(
	tag: keyof HTMLElementTagNameMap,
	attrs: HAttrs | undefined,
	...children: DOMChild[]
): HTMLElement {
	const el = document.createElement(tag);
	if (attrs) applyAttrs(el, attrs);
	appendChildren(el, children);
	return el;
}

/** Replace everything under `parent` with `node` (typical app root mount). */
export function mount(parent: HTMLElement, node: Node): void {
	parent.replaceChildren(node);
}
