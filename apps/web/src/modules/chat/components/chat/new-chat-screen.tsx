"use client";

import { useAuth } from "@/context/auth-context";
import { userFirstName } from "@/lib/user-display";
import { ChannelPrompt } from "@/modules/chat/components/chat/channel-prompt";
import { ChatComposer } from "@/modules/chat/components/chat/chat-composer";
import { QuickActions } from "@/modules/chat/components/chat/quick-actions";
import { AceMarkIcon } from "@/modules/chat/components/icons";

export function NewChatScreen() {
	const { user } = useAuth();
	const greeting = user
		? `Where should we begin, ${userFirstName(user.username)}?`
		: "Where should we begin?";

	return (
		<main className="new-chat-screen">
			<div className="dot-field new-chat-screen__dots" />
			<section className="new-chat-screen__content">
				<div className="new-chat-screen__intro">
					<AceMarkIcon size={24} />
					<h1>{greeting}</h1>
				</div>
				<ChatComposer />
				<QuickActions />
			</section>
			<ChannelPrompt />
		</main>
	);
}
