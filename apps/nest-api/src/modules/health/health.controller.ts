import { Controller, Get } from '@nestjs/common';

import { HealthService } from './health.service';
import type { HealthResponse } from './health.types';

@Controller({
	path: 'health',
	version: '1',
})
export class HealthController {
	constructor(private readonly healthService: HealthService) {}

	@Get()
	getHealth(): Promise<HealthResponse> {
		return this.healthService.getHealth();
	}
}
