"use client";

import { Loading03Icon, SentIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Button } from "@school-os/ui/components/button";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { type AssistMessage, aiService } from "../ai.service";

type ChatTurn = {
	id: string;
	role: "user" | "assistant";
	content: string;
};

export function AiAssistPanel() {
	const { token } = useAuth();
	const [turns, setTurns] = useState<ChatTurn[]>([]);
	const [draft, setDraft] = useState("");
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [providerLabel, setProviderLabel] = useState<string>("checking…");
	const endRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!token) return;
		void aiService
			.status(token)
			.then((status) => {
				setProviderLabel(
					status.ok
						? `Upstream ready · ${status.provider ?? "unknown"}`
						: "Upstream offline — start apps/ai-api",
				);
			})
			.catch(() => setProviderLabel("Upstream unavailable"));
	}, [token]);

	const scrollToEnd = () => {
		endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
	};

	const send = async () => {
		if (!token || busy) return;
		const content = draft.trim();
		if (!content) return;

		const userTurn: ChatTurn = {
			id: crypto.randomUUID(),
			role: "user",
			content,
		};
		const nextTurns = [...turns, userTurn];
		setTurns(nextTurns);
		setDraft("");
		setBusy(true);
		setError(null);
		queueMicrotask(scrollToEnd);

		const history: AssistMessage[] = nextTurns.map((turn) => ({
			role: turn.role,
			content: turn.content,
		}));

		try {
			const result = await aiService.assist(token, {
				messages: history,
				context: "admin/ai · in-app assistant",
			});
			setTurns((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: result.reply,
				},
			]);
			setProviderLabel(`${result.provider} · ${result.model}`);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Assist request failed");
		} finally {
			setBusy(false);
			queueMicrotask(scrollToEnd);
		}
	};

	return (
		<div className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-[16px] border border-dashboard-border bg-dashboard-surface">
			<header className="flex items-start justify-between gap-3 border-dashboard-border border-b px-4 py-3.5 sm:px-5">
				<div>
					<h2 className="font-semibold text-[15px] text-dashboard-text-primary">
						School OS Assist
					</h2>
					<p className="mt-0.5 text-[12px] text-dashboard-text-muted">{providerLabel}</p>
				</div>
			</header>

			<div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4 sm:px-5">
				{turns.length === 0 ? (
					<div className="rounded-[12px] border border-dashed border-dashboard-border bg-dashboard-surface-elevated px-4 py-6 text-[13px] text-dashboard-text-muted leading-5">
						Ask about the monorepo, Nest auth, billing setup, or how to run apps. Calls go{" "}
						<span className="font-medium text-dashboard-text-secondary">Web → Nest → FastAPI</span>{" "}
						— provider keys never reach the browser.
					</div>
				) : null}

				{turns.map((turn) => (
					<div
						key={turn.id}
						className={cn(
							"max-w-[90%] rounded-[12px] px-3.5 py-2.5 text-[13px] leading-5",
							turn.role === "user"
								? "ml-auto bg-dashboard-text-primary text-dashboard-bg"
								: "bg-dashboard-surface-elevated text-dashboard-text-secondary",
						)}
					>
						{turn.content}
					</div>
				))}

				{busy ? (
					<p className="inline-flex items-center gap-2 text-[12px] text-dashboard-text-muted">
						<HugeiconsIcon
							icon={Loading03Icon}
							className="size-3.5 animate-spin"
							strokeWidth={1.8}
						/>
						Thinking…
					</p>
				) : null}
				<div ref={endRef} />
			</div>

			<footer className="border-dashboard-border border-t p-3 sm:p-4">
				{error ? (
					<p className="mb-2 rounded-[10px] border border-destructive/30 bg-destructive/5 px-3 py-2 text-[12px] text-destructive">
						{error}
					</p>
				) : null}
				<form
					className="flex items-end gap-2"
					onSubmit={(event) => {
						event.preventDefault();
						void send();
					}}
				>
					<textarea
						value={draft}
						onChange={(event) => setDraft(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === "Enter" && !event.shiftKey) {
								event.preventDefault();
								void send();
							}
						}}
						rows={2}
						placeholder="Ask School OS Assist…"
						className="min-h-[44px] flex-1 resize-none rounded-[12px] border border-dashboard-border bg-dashboard-surface-elevated px-3 py-2.5 text-[13px] text-dashboard-text-primary outline-none focus-visible:border-dashboard-border-focus"
						disabled={!token || busy}
					/>
					<Button
						type="submit"
						disabled={!token || busy || !draft.trim()}
						className="h-11 shrink-0 gap-1.5"
					>
						{busy ? (
							<HugeiconsIcon
								icon={Loading03Icon}
								className="size-4 animate-spin"
								strokeWidth={1.8}
							/>
						) : (
							<HugeiconsIcon icon={SentIcon} className="size-4" strokeWidth={1.8} />
						)}
						Send
					</Button>
				</form>
			</footer>
		</div>
	);
}
