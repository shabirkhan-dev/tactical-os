import { type Env, parseEnv } from './env.schema';

export type AppConfig = {
	nodeEnv: Env['NODE_ENV'];
	port: number;
	apiPrefix: string;
	apiVersion: string;
	serviceName: string;
	jwtSecret: string;
	jwtExpiresIn: string;
	corsOrigin: string;
};

export function createAppConfig(env: Env = parseEnv()): AppConfig {
	return {
		nodeEnv: env.NODE_ENV,
		port: env.PORT,
		apiPrefix: env.API_PREFIX,
		apiVersion: env.API_VERSION,
		serviceName: env.SERVICE_NAME,
		jwtSecret: env.JWT_SECRET,
		jwtExpiresIn: env.JWT_EXPIRES_IN,
		corsOrigin: env.CORS_ORIGIN,
	};
}
