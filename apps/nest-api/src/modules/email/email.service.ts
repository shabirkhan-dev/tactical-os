import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { AppConfigService } from '../../config/app-config.service';
import { magicLinkEmail, passwordResetEmail, verificationEmail } from './email.templates';

@Injectable()
export class EmailService {
	constructor(private readonly config: AppConfigService) {}

	sendVerificationCode(to: string, code: string): Promise<void> {
		return this.send(to, verificationEmail(code));
	}

	sendPasswordResetCode(to: string, code: string): Promise<void> {
		return this.send(to, passwordResetEmail(code));
	}

	sendMagicLink(to: string, url: string): Promise<void> {
		return this.send(to, magicLinkEmail(url));
	}

	private async send(to: string, message: { subject: string; html: string }): Promise<void> {
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
				to: [to],
				subject: message.subject,
				html: message.html,
			}),
		});

		if (!response.ok) {
			throw new ServiceUnavailableException({
				code: 'EMAIL_DELIVERY_FAILED',
				message: 'The email could not be delivered. Please try again.',
			});
		}
	}
}
