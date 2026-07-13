import type { Metadata } from "next";

import "@/modules/chat/styles/chat.css";

export const metadata: Metadata = {
	title: "Chat | School OS",
	description: "School OS chat workspace",
};

export default function ChatLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return children;
}
