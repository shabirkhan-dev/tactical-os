import type { AppConfig } from "@/shared/interfaces/app-config";
import { getEnv, requireEnv } from "@/shared/utils/get-env";

function loadAppConfig(): AppConfig {
	const portRaw = getEnv("PORT", "8080");
	const port = Number.parseInt(portRaw, 10);
	const env = getEnv("NODE_ENV", "development");
	const isProduction = env === "production";
	const databaseUrl = isProduction
		? requireEnv("DATABASE_URL")
		: getEnv("DATABASE_URL", "postgresql://hono:hono@localhost:5432/hono");
	const jwtSecret = isProduction ? requireEnv("JWT_SECRET") : getEnv("JWT_SECRET", "");
	const jwtRefreshSecret = isProduction
		? requireEnv("JWT_REFRESH_SECRET")
		: getEnv("JWT_REFRESH_SECRET", "");

	return {
		name: getEnv("APP_NAME", "hono-api"),
		version: getEnv("APP_VERSION", "0.0.0"),
		env,
		port: Number.isNaN(port) ? 8080 : port,
		host: getEnv("HOST", "0.0.0.0"),
		appOrigin: getEnv("APP_ORIGIN", "localhost"),
		basePath: getEnv("BASE_PATH", "/api/v1"),
		databaseUrl,
		jwt: {
			secret: jwtSecret,
			expiresIn: getEnv("JWT_EXPIRES_IN", "15m"),
			refreshSecret: jwtRefreshSecret,
			refreshExpiresIn: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
		},
		mailerSender: getEnv("MAILER_SENDER"),
		resendApiKey: getEnv("RESEND_API_KEY"),
	};
}

export const appConfig = loadAppConfig();
