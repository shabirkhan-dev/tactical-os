import {
	AiNetworkIcon,
	ArrowDown01Icon,
	ArrowUp02Icon,
	CrownIcon,
	Mic01Icon,
	PlusSignIcon,
	SentIcon,
	SparklesIcon,
} from "@hugeicons/core-free-icons";
import { type FormEvent, type KeyboardEvent, useState } from "react";

import { ChatHugeIcon } from "@/modules/chat/components/chat/chat-icon";

export function ChatComposer() {
	const [prompt, setPrompt] = useState("");
	const canSubmit = prompt.trim().length > 0;

	const submitPrompt = () => {
		if (!canSubmit) {
			return;
		}

		setPrompt("");
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		submitPrompt();
	};

	const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			submitPrompt();
		}
	};

	return (
		<form className="chat-composer" onSubmit={handleSubmit}>
			<div className="chat-composer__panel">
				<textarea
					aria-label="Message"
					placeholder="Ask anything..."
					rows={3}
					value={prompt}
					onChange={(event) => setPrompt(event.target.value)}
					onKeyDown={handleKeyDown}
				/>

				<div className="chat-composer__toolbar">
					<div className="chat-composer__tools">
						<button className="chat-tool-button" type="button" aria-label="Add attachment">
							<ChatHugeIcon icon={PlusSignIcon} />
						</button>
						<button className="chat-tool-button" type="button" aria-label="Choose tools">
							<ChatHugeIcon icon={AiNetworkIcon} />
						</button>
						<button className="chat-super-computer" type="button">
							<ChatHugeIcon icon={SentIcon} />
							<span>Super Computer</span>
							<span className="chat-new-badge">New</span>
						</button>
					</div>

					<div className="chat-composer__actions">
						<button className="chat-model-button" type="button">
							<ChatHugeIcon icon={SparklesIcon} />
							<span>Opus 4.7</span>
							<ChatHugeIcon icon={ArrowDown01Icon} size={14} />
						</button>
						<button className="chat-mic-button" type="button" aria-label="Use microphone">
							<ChatHugeIcon icon={Mic01Icon} />
						</button>
						<button
							className="chat-send-button"
							type="submit"
							aria-label="Send message"
							disabled={!canSubmit}
						>
							<ChatHugeIcon icon={ArrowUp02Icon} strokeWidth={1.8} />
						</button>
					</div>
				</div>
			</div>

			<div className="chat-upgrade-rail">
				<span className="chat-upgrade-rail__label">
					<ChatHugeIcon icon={CrownIcon} />
					<span>Upgrade to PRO</span>
				</span>
				<button type="button">Upgrade</button>
			</div>
		</form>
	);
}
