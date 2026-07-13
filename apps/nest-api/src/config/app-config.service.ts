import { Injectable } from '@nestjs/common';

import { type AppConfig, createAppConfig } from './app.config';

@Injectable()
export class AppConfigService {
	private readonly config: AppConfig = createAppConfig();

	get nodeEnv(): AppConfig['nodeEnv'] {
		return this.config.nodeEnv;
	}
	get isProduction(): boolean {
		return this.config.nodeEnv === 'production';
	}
	get port(): number {
		return this.config.port;
	}
	get apiPrefix(): string {
		return this.config.apiPrefix;
	}
	get apiVersion(): string {
		return this.config.apiVersion;
	}
	get serviceName(): string {
		return this.config.serviceName;
	}
	get databaseUrl(): string {
		return this.config.databaseUrl;
	}
	get databasePoolMax(): number {
		return this.config.databasePoolMax;
	}
	get databaseSsl(): boolean {
		return this.config.databaseSsl;
	}
	get jwtSecret(): string {
		return this.config.jwtSecret;
	}
	get jwtAccessExpiresIn(): string {
		return this.config.jwtAccessExpiresIn;
	}
	get authTokenSecret(): string {
		return this.config.authTokenSecret;
	}
	get sessionTtlDays(): number {
		return this.config.sessionTtlDays;
	}
	get otpTtlMinutes(): number {
		return this.config.otpTtlMinutes;
	}
	get otpMaxAttempts(): number {
		return this.config.otpMaxAttempts;
	}
	get passwordBcryptRounds(): number {
		return this.config.passwordBcryptRounds;
	}
	get maxLoginAttempts(): number {
		return this.config.maxLoginAttempts;
	}
	get loginLockMinutes(): number {
		return this.config.loginLockMinutes;
	}
	get refreshCookieName(): string {
		return this.config.refreshCookieName;
	}
	get cookieDomain(): string | undefined {
		return this.config.cookieDomain;
	}
	get corsOrigins(): string[] {
		return this.config.corsOrigin.split(',').map((origin) => origin.trim());
	}
	get trustProxy(): boolean {
		return this.config.trustProxy;
	}
	get exposeAuthCodes(): boolean {
		return !this.isProduction && this.config.authDevExposeCodes;
	}
	get resendApiKey(): string | undefined {
		return this.config.resendApiKey;
	}
	get authEmailFrom(): string {
		return this.config.authEmailFrom;
	}
}
