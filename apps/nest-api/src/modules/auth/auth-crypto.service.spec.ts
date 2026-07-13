import { AppConfigService } from '../../config/app-config.service';
import { AuthCryptoService } from './auth-crypto.service';

describe('AuthCryptoService', () => {
	const service = new AuthCryptoService(new AppConfigService());

	it('hashes passwords without storing the original value', async () => {
		const password = 'a-strong-test-password';
		const passwordHash = await service.hashPassword(password);

		expect(passwordHash).not.toBe(password);
		await expect(service.verifyPassword(password, passwordHash)).resolves.toBe(true);
		await expect(service.verifyPassword('incorrect-password', passwordHash)).resolves.toBe(false);
	});

	it('creates verifiable purpose-bound OTP hashes', () => {
		const hash = service.hashOtp('email_verification', 'starter@example.com', '123456');

		expect(service.verifyOtp('email_verification', 'starter@example.com', '123456', hash)).toBe(
			true,
		);
		expect(service.verifyOtp('password_reset', 'starter@example.com', '123456', hash)).toBe(false);
	});

	it('creates refresh tokens that reveal only the session identifier', () => {
		const sessionId = '9d3f45e6-f7df-4f64-8bd2-c20a2dd28722';
		const token = service.createRefreshToken(sessionId);
		const tokenHash = service.hashRefreshToken(token);

		expect(service.getSessionIdFromRefreshToken(token)).toBe(sessionId);
		expect(service.verifyRefreshToken(token, tokenHash)).toBe(true);
		expect(service.verifyRefreshToken(`${sessionId}.wrong`, tokenHash)).toBe(false);
	});

	it('signs short-lived access tokens with minimal claims', async () => {
		const payload = {
			sub: 'a01a0cab-a947-44f0-bfcd-4b8e8c907534',
			sid: '9d3f45e6-f7df-4f64-8bd2-c20a2dd28722',
		};
		const signed = await service.signAccessToken(payload);

		await expect(service.verifyAccessToken(signed.token)).resolves.toEqual(payload);
		expect(signed.expiresAt.getTime()).toBeGreaterThan(Date.now());
	});
});
