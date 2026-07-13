import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { AppConfigService } from '../../config/app-config.service';
import type { AuthCryptoService } from '../auth/auth-crypto.service';
import type { UsersService } from '../users/users.service';
import type { PasskeysRepository } from './passkeys.repository';

const { generateAuthenticationOptionsMock } = vi.hoisted(() => ({
	generateAuthenticationOptionsMock: vi.fn(),
}));

vi.mock('@simplewebauthn/server', async (importOriginal) => ({
	...(await importOriginal<typeof import('@simplewebauthn/server')>()),
	generateAuthenticationOptions: generateAuthenticationOptionsMock,
}));

import { PasskeysService } from './passkeys.service';

describe('PasskeysService', () => {
	beforeEach(() => {
		vi.clearAllMocks();
		generateAuthenticationOptionsMock.mockResolvedValue({ challenge: 'challenge-value' });
	});

	it('starts discoverable authentication without an email address', async () => {
		const repository = {
			createAuthenticationChallenge: vi.fn().mockResolvedValue({ id: 'challenge-id' }),
			listForUser: vi.fn(),
		} as unknown as PasskeysRepository;
		const users = {
			findByEmail: vi.fn(),
		} as unknown as UsersService;
		const crypto = {
			hashOtp: vi.fn().mockReturnValue('challenge-hash'),
		} as unknown as AuthCryptoService;
		const service = new PasskeysService(
			{
				webAuthnRpId: 'localhost',
				mfaChallengeTtlMinutes: 5,
			} as AppConfigService,
			crypto,
			repository,
			users,
		);

		const result = await service.beginAuthentication();

		expect(result.challengeId).toBe('challenge-id');
		expect(users.findByEmail).not.toHaveBeenCalled();
		expect(repository.listForUser).not.toHaveBeenCalled();
		expect(generateAuthenticationOptionsMock).toHaveBeenCalledWith({
			rpID: 'localhost',
			userVerification: 'required',
		});
		expect(repository.createAuthenticationChallenge).toHaveBeenCalledWith({
			userId: null,
			challengeHash: 'challenge-hash',
			expiresAt: expect.any(Date),
		});
		expect(crypto.hashOtp).toHaveBeenCalledWith(
			'webauthn_authentication',
			'discoverable',
			'challenge-value',
		);
	});
});
