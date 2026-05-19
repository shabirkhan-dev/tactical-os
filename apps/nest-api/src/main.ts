import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: true,
		credentials: true,
	});
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
		}),
	);
	app.useGlobalFilters(new HttpExceptionFilter());
	app.useGlobalInterceptors(new ResponseInterceptor());

	const port = Number.parseInt(process.env.PORT ?? '3002', 10);
	await app.listen(port);
}
bootstrap();
