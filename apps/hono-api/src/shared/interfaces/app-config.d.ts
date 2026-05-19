export interface AppConfig {
	name: string;
	version: string;
	env: string;
	port: number;
	host: string;
	appOrigin: string;
	basePath: string;
	databaseUrl: string;
	jwt: {
		secret: string;
		expiresIn: string;
		refreshSecret: string;
		refreshExpiresIn: string;
	};
	mailerSender?: string;
	resendApiKey?: string;
}
