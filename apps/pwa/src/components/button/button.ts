import "./button.css";

export type ButtonVariant = "primary" | "ghost";

export type ButtonProps = {
	label: string;
	onClick?: (event: MouseEvent) => void;
	variant?: ButtonVariant;
	className?: string;
};

/** Returns a native `<button>` you can append or pass as a child to `h()`. */
export function Button(props: ButtonProps): HTMLButtonElement {
	const { label, onClick, variant = "primary", className } = props;
	const el = document.createElement("button");
	el.className = ["button", variant === "ghost" ? "button--ghost" : "button--primary", className]
		.filter(Boolean)
		.join(" ");
	el.type = "button";
	el.textContent = label;
	if (onClick) el.addEventListener("click", onClick);
	return el;
}
