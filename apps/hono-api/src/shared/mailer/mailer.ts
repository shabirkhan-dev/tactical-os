import { createLogger } from "@starter/logger";
import { appConfig } from "@/shared/configs/app-config";

const log = createLogger({ prefix: "mailer" });

export interface SendEmailOptions {
	to: string;
	subject: string;
	html?: string;
	text?: string;
}

/**
 * Sends an email. When RESEND_API_KEY is set, uses Resend; otherwise logs and returns (no-op for dev).
 */
export async function sendEmail(opts: SendEmailOptions): Promise<{ id?: string; error?: Error }> {
	if (!appConfig.resendApiKey || !appConfig.mailerSender) {
		log.info("Mailer not configured; skipping send", { to: opts.to, subject: opts.subject });
		return {};
	}
	try {
		const res = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${appConfig.resendApiKey}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				from: appConfig.mailerSender,
				to: opts.to,
				subject: opts.subject,
				html: opts.html ?? opts.text,
				text: opts.text,
			}),
		});
		const data = (await res.json()) as { id?: string; message?: string };
		if (!res.ok) {
			const err = new Error(data.message ?? `Resend error: ${res.status}`);
			return { error: err };
		}
		return { id: data.id };
	} catch (e) {
		const err = e instanceof Error ? e : new Error(String(e));
		log.error("Send email failed", err);
		return { error: err };
	}
}

export function verifyEmailTemplate(verificationUrl: string): SendEmailOptions {
	return {
		to: "",
		subject: "Verify your email",
		html: `Please verify your email by clicking: <a href="${verificationUrl}">${verificationUrl}</a>`,
		text: `Please verify your email by visiting: ${verificationUrl}`,
	};
}

export function passwordResetTemplate(resetUrl: string): SendEmailOptions {
	return {
		to: "",
		subject: "Reset your password",
		html: `Reset your password: <a href="${resetUrl}">${resetUrl}</a>`,
		text: `Reset your password: ${resetUrl}`,
	};
}
