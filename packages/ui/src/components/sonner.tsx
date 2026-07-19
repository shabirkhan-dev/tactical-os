"use client";

import {
	Alert02Icon,
	CheckmarkCircle02Icon,
	InformationCircleIcon,
	Loading03Icon,
	MultiplicationSignCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import { useEffect, useState } from "react";
import { Toaster as Sonner, type ToasterProps } from "sonner";

function useDocumentTheme(): NonNullable<ToasterProps["theme"]> {
	const [theme, setTheme] = useState<NonNullable<ToasterProps["theme"]>>("system");

	useEffect(() => {
		const root = document.documentElement;
		const sync = () => {
			setTheme(root.classList.contains("dark") ? "dark" : "light");
		};
		sync();
		const observer = new MutationObserver(sync);
		observer.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => observer.disconnect();
	}, []);

	return theme;
}

const Toaster = ({ theme: themeProp, ...props }: ToasterProps) => {
	const documentTheme = useDocumentTheme();
	const theme = themeProp ?? documentTheme;

	return (
		<Sonner
			theme={theme}
			className="toaster group"
			icons={{
				success: <HugeiconsIcon icon={CheckmarkCircle02Icon} strokeWidth={2} className="size-4" />,
				info: <HugeiconsIcon icon={InformationCircleIcon} strokeWidth={2} className="size-4" />,
				warning: <HugeiconsIcon icon={Alert02Icon} strokeWidth={2} className="size-4" />,
				error: (
					<HugeiconsIcon icon={MultiplicationSignCircleIcon} strokeWidth={2} className="size-4" />
				),
				loading: (
					<HugeiconsIcon icon={Loading03Icon} strokeWidth={2} className="size-4 animate-spin" />
				),
			}}
			style={
				{
					"--normal-bg": "var(--popover)",
					"--normal-text": "var(--popover-foreground)",
					"--normal-border": "var(--border)",
					"--border-radius": "var(--radius)",
				} as React.CSSProperties
			}
			toastOptions={{
				classNames: {
					toast: "cn-toast",
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
