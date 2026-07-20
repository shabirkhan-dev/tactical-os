import { Test, type TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ConfigModule } from '@/config/config.module';
import { DatabaseService } from '@/database/database.service';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
	let controller: HealthController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			controllers: [HealthController],
			providers: [
				HealthService,
				{
					provide: DatabaseService,
					useValue: {
						db: {
							execute: vi.fn().mockResolvedValue([{ '?column?': 1 }]),
						},
					},
				},
			],
		}).compile();

		controller = module.get(HealthController);
	});

	it('returns the API health status with database up', async () => {
		await expect(controller.getHealth()).resolves.toEqual({
			status: 'ok',
			service: 'starter-api',
			database: 'up',
		});
	});
});
