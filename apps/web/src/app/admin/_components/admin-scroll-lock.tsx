"use client";

import { useEffect } from "react";

/**
 * Keep document (html/body) from scrolling while the admin shell owns scroll.
 * Without this, main's overflow-y-auto + body scroll = double vertical bars.
 */
export function AdminScrollLock() {
	useEffect(() => {
		const html = document.documentElement;
		const body = document.body;
		const prev = {
			htmlOverflow: html.style.overflow,
			bodyOverflow: body.style.overflow,
			htmlHeight: html.style.height,
			bodyHeight: body.style.height,
		};

		html.style.overflow = "hidden";
		body.style.overflow = "hidden";
		html.style.height = "100%";
		body.style.height = "100%";

		return () => {
			html.style.overflow = prev.htmlOverflow;
			body.style.overflow = prev.bodyOverflow;
			html.style.height = prev.htmlHeight;
			body.style.height = prev.bodyHeight;
		};
	}, []);

	return null;
}
