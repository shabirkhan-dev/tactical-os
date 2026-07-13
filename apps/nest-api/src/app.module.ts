import { Module } from '@nestjs/common';

import { ConfigModule } from './config/config.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';

@Module({
	imports: [ConfigModule, HealthModule, AuthModule],
})
export class AppModule {}
