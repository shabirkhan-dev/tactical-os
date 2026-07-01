import type { INestApplication } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { requestIdMiddleware } from './common/middleware/request-id.middleware';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe';
import type { AppConfigService } from './config/app-config.service';

export function setupApp(app: INestApplication, config: AppConfigService): void {
	app.setGlobalPrefix(config.apiPrefix);
	app.enableVersioning({
		type: VersioningType.URI,
		prefix: 'v',
		defaultVersion: config.apiVersion,
	});

	app.use(requestIdMiddleware);
	app.useGlobalPipes(new ZodValidationPipe());
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());
}
