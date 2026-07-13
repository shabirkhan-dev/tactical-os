import { MessengerIcon, SlackIcon, WhatsappIcon } from "@hugeicons/core-free-icons";

import { ChatHugeIcon } from "@/modules/chat/components/chat/chat-icon";

const channelIcons = [
	{ icon: MessengerIcon, color: "#168aff" },
	{ icon: SlackIcon, color: "#8a3ffc" },
	{ icon: WhatsappIcon, color: "#20b958" },
];

export function ChannelPrompt() {
	return (
		<button className="chat-channel-prompt" type="button">
			<span className="chat-channel-prompt__visual" aria-hidden="true">
				{channelIcons.map(({ icon, color }) => (
					<span className="chat-channel-prompt__app" key={color}>
						<ChatHugeIcon icon={icon} size={14} style={{ color }} strokeWidth={1.7} />
					</span>
				))}
			</span>
			<span className="chat-channel-prompt__copy">
				<strong>Connect your channel</strong>
				<span>Connect Slack, Zendesk, or Intercom so</span>
			</span>
		</button>
	);
}
