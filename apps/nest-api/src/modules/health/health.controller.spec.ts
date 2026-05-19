import { HealthController } from './health.controller';

describe('HealthController', () => {
	const controller = new HealthController();

	it('returns root metadata', () => {
		expect(controller.root()).toEqual({
			message: 'OK',
			data: {
				name: 'nest-api',
				version: '1.0.0',
			},
		});
	});

	it('returns health status', () => {
		expect(controller.health()).toMatchObject({
			message: 'OK',
			data: {
				status: 'ok',
			},
		});
	});
});
