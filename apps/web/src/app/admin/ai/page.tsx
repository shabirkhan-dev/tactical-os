import { AiAssistPanel } from "@/modules/ai";

export default function AdminAiPage() {
	return (
		<div className="mx-auto flex w-full max-w-[880px] flex-col gap-5 px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
			<header className="border-dashboard-border border-b pb-5">
				<p className="mb-1.5 text-[11px] text-dashboard-text-muted uppercase tracking-wide">
					Intelligence
				</p>
				<h1 className="font-semibold text-[24px] text-dashboard-text-primary tracking-tight">
					AI Assist
				</h1>
				<p className="mt-1.5 max-w-2xl text-[13px] text-dashboard-text-muted leading-5">
					In-app assistance powered by the Python FastAPI service. Nest authenticates you and
					proxies every request — the browser never talks to the model provider.
				</p>
			</header>
			<div className="min-h-[32rem]">
				<AiAssistPanel />
			</div>
		</div>
	);
}
