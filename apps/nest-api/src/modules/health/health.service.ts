import { Injectable } from '@nestjs/common';

import { AppConfigService } from '../../config/app-config.service';
import type { HealthResponse } from './health.types';

@Injectable()
export class HealthService {
	constructor(private readonly config: AppConfigService) {}

	getHealth(): HealthResponse {
		return {
			status: 'ok',
			service: this.config.serviceName,
		};
	}
}
