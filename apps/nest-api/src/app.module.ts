import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './modules/health/health.module';

@Module({
	imports: [HealthModule, AuthModule],
})
export class AppModule {}
