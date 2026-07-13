"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
	interface Window {
		google?: {
			accounts: {
				id: {
					initialize: (options: {
						client_id: string;
						callback: (value: { credential: string }) => void;
					}) => void;
					renderButton: (element: HTMLElement, options: Record<string, unknown>) => void;
				};
			};
		};
	}
}

export function GoogleIdentityButton({
	onCredential,
	disabled = false,
}: {
	onCredential: (credential: string) => void;
	disabled?: boolean;
}) {
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
	const element = useRef<HTMLDivElement>(null);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded || !clientId || !element.current || !window.google) return;
		window.google.accounts.id.initialize({
			client_id: clientId,
			callback: ({ credential }) => onCredential(credential),
		});
		element.current.replaceChildren();
		window.google.accounts.id.renderButton(element.current, {
			theme: "outline",
			size: "large",
			width: element.current.clientWidth,
			text: "continue_with",
			shape: "rectangular",
		});
	}, [clientId, loaded, onCredential]);

	if (!clientId) return null;
	return (
		<div className={disabled ? "pointer-events-none opacity-50" : undefined}>
			<Script
				src="https://accounts.google.com/gsi/client"
				strategy="afterInteractive"
				onLoad={() => setLoaded(true)}
			/>
			<div ref={element} className="min-h-10 w-full" />
		</div>
	);
}
