import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/common/filters/http-exception.filter';
import { ResponseInterceptor } from '../src/common/interceptors/response.interceptor';

describe('Auth API (e2e)', () => {
	let app: INestApplication<App>;

	beforeAll(async () => {
		const moduleFixture = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				transform: true,
			}),
		);
		app.useGlobalFilters(new HttpExceptionFilter());
		app.useGlobalInterceptors(new ResponseInterceptor());
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it('returns health', async () => {
		const response = await request(app.getHttpServer()).get('/health').expect(200);
		expect(response.body.success).toBe(true);
		expect(response.body.data.status).toBe('ok');
	});

	it('register/login/me flow', async () => {
		const user = {
			name: 'Test User',
			email: 'test@example.com',
			password: 'super-secret-password',
		};

		await request(app.getHttpServer()).post('/auth/register').send(user).expect(201);

		const loginResponse = await request(app.getHttpServer())
			.post('/auth/login')
			.send({
				email: user.email,
				password: user.password,
			})
			.expect(201);

		const accessToken = loginResponse.body.data.accessToken as string;
		expect(accessToken).toBeTruthy();

		const meResponse = await request(app.getHttpServer())
			.get('/auth/me')
			.set('Authorization', `Bearer ${accessToken}`)
			.expect(200);

		expect(meResponse.body.data.user.email).toBe(user.email);
	});
});
