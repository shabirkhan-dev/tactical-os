import { type Env, parseEnv } from './env.schema';

export type AppConfig = {
	nodeEnv: Env['NODE_ENV'];
	port: number;
	apiPrefix: string;
	apiVersion: string;
	serviceName: string;
	databaseUrl: string;
	databasePoolMax: number;
	databaseSsl: boolean;
	jwtSecret: string;
	jwtAccessExpiresIn: string;
	authTokenSecret: string;
	sessionTtlDays: number;
	otpTtlMinutes: number;
	otpMaxAttempts: number;
	passwordBcryptRounds: number;
	maxLoginAttempts: number;
	loginLockMinutes: number;
	refreshCookieName: string;
	cookieDomain?: string;
	corsOrigin: string;
	trustProxy: boolean;
	authDevExposeCodes: boolean;
	resendApiKey?: string;
	authEmailFrom: string;
};

export function createAppConfig(env: Env = parseEnv()): AppConfig {
	return {
		nodeEnv: env.NODE_ENV,
		port: env.PORT,
		apiPrefix: env.API_PREFIX,
		apiVersion: env.API_VERSION,
		serviceName: env.SERVICE_NAME,
		databaseUrl: env.DATABASE_URL,
		databasePoolMax: env.DATABASE_POOL_MAX,
		databaseSsl:
			env.DATABASE_SSL !== undefined
				? env.DATABASE_SSL === 'true'
				: /(?:neon\.tech|sslmode=require)/i.test(env.DATABASE_URL),
		jwtSecret: env.JWT_SECRET,
		jwtAccessExpiresIn: env.JWT_ACCESS_EXPIRES_IN,
		authTokenSecret: env.AUTH_TOKEN_SECRET,
		sessionTtlDays: env.SESSION_TTL_DAYS,
		otpTtlMinutes: env.OTP_TTL_MINUTES,
		otpMaxAttempts: env.OTP_MAX_ATTEMPTS,
		passwordBcryptRounds: env.PASSWORD_BCRYPT_ROUNDS,
		maxLoginAttempts: env.MAX_LOGIN_ATTEMPTS,
		loginLockMinutes: env.LOGIN_LOCK_MINUTES,
		refreshCookieName: env.REFRESH_COOKIE_NAME,
		...(env.COOKIE_DOMAIN ? { cookieDomain: env.COOKIE_DOMAIN } : {}),
		corsOrigin: env.CORS_ORIGIN,
		trustProxy: env.TRUST_PROXY,
		authDevExposeCodes: env.AUTH_DEV_EXPOSE_CODES,
		...(env.RESEND_API_KEY ? { resendApiKey: env.RESEND_API_KEY } : {}),
		authEmailFrom: env.AUTH_EMAIL_FROM,
	};
}
