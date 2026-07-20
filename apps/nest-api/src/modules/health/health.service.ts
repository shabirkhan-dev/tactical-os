import { Injectable } from '@nestjs/common';
import { sql } from 'drizzle-orm';

import { AppConfigService } from '@/config/app-config.service';
import { DatabaseService } from '@/database/database.service';
import type { HealthResponse } from './health.types';

@Injectable()
export class HealthService {
	constructor(
		private readonly config: AppConfigService,
		private readonly database: DatabaseService,
	) {}

	async getHealth(): Promise<HealthResponse> {
		const database = await this.checkDatabase();
		return {
			status: database === 'up' ? 'ok' : 'degraded',
			service: this.config.serviceName,
			database,
		};
	}

	private async checkDatabase(): Promise<'up' | 'down'> {
		try {
			await this.database.db.execute(sql`select 1`);
			return 'up';
		} catch {
			return 'down';
		}
	}
}
