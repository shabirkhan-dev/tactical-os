import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '@/app.module';
import { setupApp } from '@/app.setup';
import { AppConfigService } from '@/config/app-config.service';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, { rawBody: true });
	const config = app.get(AppConfigService);

	setupApp(app, config);

	await app.listen(config.port);
}

void bootstrap();
