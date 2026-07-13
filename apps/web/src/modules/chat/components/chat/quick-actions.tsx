import { chatQuickActions } from "@/modules/chat/components/chat/chat.data";
import { ChatHugeIcon } from "@/modules/chat/components/chat/chat-icon";

export function QuickActions() {
	return (
		<section className="chat-quick-actions" aria-label="Suggested actions">
			{chatQuickActions.map(({ label, description, icon }) => (
				<button className="chat-quick-card" type="button" key={label}>
					<ChatHugeIcon icon={icon} size={18} />
					<span className="chat-quick-card__label">{label}</span>
					<span className="chat-quick-card__description">{description}</span>
				</button>
			))}
		</section>
	);
}
