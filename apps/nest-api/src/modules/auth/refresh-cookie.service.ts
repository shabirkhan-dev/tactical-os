import { Injectable } from '@nestjs/common';
import type { CookieOptions, Request, Response } from 'express';

import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class RefreshCookieService {
	constructor(private readonly config: AppConfigService) {}

	read(request: Request): string | null {
		const value = request.cookies?.[this.config.refreshCookieName];
		return typeof value === 'string' && value.length > 0 ? value : null;
	}

	set(response: Response, refreshToken: string): void {
		response.cookie(this.config.refreshCookieName, refreshToken, {
			...this.options(),
			maxAge: this.config.sessionTtlDays * 86_400_000,
		});
	}

	clear(response: Response): void {
		response.clearCookie(this.config.refreshCookieName, this.options());
	}

	private options(): CookieOptions {
		return {
			httpOnly: true,
			secure: this.config.isProduction,
			sameSite: 'lax',
			path: `/${this.config.apiPrefix}/v${this.config.apiVersion}/auth`,
			...(this.config.cookieDomain ? { domain: this.config.cookieDomain } : {}),
		};
	}
}
