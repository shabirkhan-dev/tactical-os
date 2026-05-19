import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
	@Get()
	root() {
		return {
			message: 'OK',
			data: {
				name: 'nest-api',
				version: '1.0.0',
			},
		};
	}

	@Get('health')
	health() {
		return {
			message: 'OK',
			data: {
				status: 'ok',
				env: process.env.NODE_ENV ?? 'development',
			},
		};
	}
}
