import { Moon01Icon, Sun01Icon } from "@hugeicons/core-free-icons";
import { Switch } from "radix-ui";
import { useEffect, useState } from "react";

import { HeaderHugeIcon } from "@/modules/chat/components/header/huge-icon";
import { applyTheme, getPreferredTheme, setTheme, type Theme } from "@/modules/chat/lib/theme";

export function ThemeToggle() {
	const [theme, setThemeState] = useState<Theme>("light");
	const isDark = theme === "dark";

	useEffect(() => {
		const preferredTheme = getPreferredTheme();
		setThemeState(preferredTheme);
		applyTheme(preferredTheme);

		const media = window.matchMedia("(prefers-color-scheme: dark)");
		const onChange = () => {
			if (!localStorage.getItem("ace-theme")) {
				const next = media.matches ? "dark" : "light";
				setThemeState(next);
				setTheme(next);
			}
		};

		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, []);

	function handleThemeChange(checked: boolean) {
		const next = checked ? "dark" : "light";
		setThemeState(next);
		setTheme(next);
	}

	return (
		<Switch.Root
			className="theme-toggle"
			checked={isDark}
			onCheckedChange={handleThemeChange}
			aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
			title={isDark ? "Light mode" : "Dark mode"}
		>
			<span className="theme-toggle__track" data-checked={isDark}>
				<span className="theme-toggle__thumb">
					<HeaderHugeIcon icon={isDark ? Moon01Icon : Sun01Icon} size={12} />
				</span>
			</span>
		</Switch.Root>
	);
}
