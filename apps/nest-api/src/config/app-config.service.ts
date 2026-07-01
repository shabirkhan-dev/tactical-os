import { Injectable } from '@nestjs/common';

import { createAppConfig, type AppConfig } from './app.config';

@Injectable()
export class AppConfigService {
	private readonly config: AppConfig = createAppConfig();

	get nodeEnv(): AppConfig['nodeEnv'] {
		return this.config.nodeEnv;
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
}
