import type { INestApplication } from '@nestjs/common';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { requestIdMiddleware } from './common/middleware/request-id.middleware';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe';
import type { AppConfigService } from './config/app-config.service';

export function setupApp(app: INestApplication, config: AppConfigService): void {
	app.use(helmet());
	app.use(cookieParser());

	if (config.trustProxy) {
		app.getHttpAdapter().getInstance().set('trust proxy', 1);
	}

	app.setGlobalPrefix(config.apiPrefix);
	app.enableVersioning({
		type: VersioningType.URI,
		prefix: 'v',
		defaultVersion: config.apiVersion,
	});

	app.enableCors({
		origin: config.corsOrigins,
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'X-Request-Id'],
	});

	app.use(requestIdMiddleware);
	app.useGlobalPipes(new ZodValidationPipe());
	app.useGlobalInterceptors(new ResponseInterceptor());
	app.useGlobalFilters(new HttpExceptionFilter());

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Starter API')
		.setDescription('Starter authentication and user API')
		.setVersion(config.apiVersion)
		.addBearerAuth()
		.build();
	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup(`${config.apiPrefix}/docs`, app, document);
}
