import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class AuthEmailService {
	constructor(private readonly config: AppConfigService) {}

	async sendVerificationCode(email: string, code: string): Promise<void> {
		await this.send({
			to: email,
			subject: 'Verify your email address',
			heading: 'Verify your email',
			message: 'Use this one-time code to verify your email address:',
			code,
		});
	}

	async sendPasswordResetCode(email: string, code: string): Promise<void> {
		await this.send({
			to: email,
			subject: 'Reset your password',
			heading: 'Reset your password',
			message: 'Use this one-time code to reset your password:',
			code,
		});
	}

	private async send(input: {
		to: string;
		subject: string;
		heading: string;
		message: string;
		code: string;
	}): Promise<void> {
		if (!this.config.resendApiKey) {
			return;
		}

		const response = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${this.config.resendApiKey}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: this.config.authEmailFrom,
				to: [input.to],
				subject: input.subject,
				html: buildEmailHtml(input.heading, input.message, input.code),
			}),
		});

		if (!response.ok) {
			throw new ServiceUnavailableException({
				code: 'AUTH_EMAIL_DELIVERY_FAILED',
				message: 'The authentication email could not be delivered. Please try again.',
			});
		}
	}
}

function buildEmailHtml(heading: string, message: string, code: string): string {
	return `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#171717"><h1>${heading}</h1><p>${message}</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p><p>This code expires shortly. If you did not request it, you can ignore this email.</p></body></html>`;
}
