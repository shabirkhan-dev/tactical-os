import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import {
	type AuthenticationResponseJSON,
	type AuthenticatorTransportFuture,
	generateAuthenticationOptions,
	generateRegistrationOptions,
	type RegistrationResponseJSON,
	verifyAuthenticationResponse,
	verifyRegistrationResponse,
} from '@simplewebauthn/server';

import { AppConfigService } from '../../config/app-config.service';
import type { AuthChallengeRecord } from '../../database/schema';
import { AuthCryptoService } from '../auth/auth-crypto.service';
import { UsersService } from '../users/users.service';
import { PasskeysRepository } from './passkeys.repository';

@Injectable()
export class PasskeysService {
	constructor(
		private readonly config: AppConfigService,
		private readonly crypto: AuthCryptoService,
		private readonly repository: PasskeysRepository,
		private readonly users: UsersService,
	) {}

	async beginRegistration(userId: string) {
		const user = await this.users.findById(userId);
		if (!user?.isActive) throw invalidPasskey();
		const existing = await this.repository.listForUser(userId);
		const options = await generateRegistrationOptions({
			rpName: this.config.appName,
			rpID: this.config.webAuthnRpId,
			userID: new TextEncoder().encode(user.id),
			userName: user.email,
			userDisplayName: user.username,
			attestationType: 'none',
			excludeCredentials: existing.map((passkey) => ({
				id: passkey.credentialId,
				transports: passkey.transports as AuthenticatorTransportFuture[],
			})),
			authenticatorSelection: { residentKey: 'preferred', userVerification: 'required' },
			preferredAuthenticatorType: 'localDevice',
		});
		const challenge = await this.repository.createChallenge({
			userId,
			email: user.email,
			purpose: 'webauthn_registration',
			challengeHash: this.crypto.hashOtp('webauthn_registration', user.email, options.challenge),
			expiresAt: new Date(Date.now() + this.config.mfaChallengeTtlMinutes * 60_000),
		});
		return { challengeId: challenge.id, options };
	}

	async finishRegistration(input: {
		userId: string;
		challengeId: string;
		name: string;
		response: RegistrationResponseJSON;
	}) {
		const user = await this.users.findById(input.userId);
		const challenge = await this.requireChallenge(
			input.challengeId,
			input.userId,
			'webauthn_registration',
		);
		if (!user) throw invalidPasskey();
		const verification = await verifyRegistrationResponse({
			response: input.response,
			expectedChallenge: (value) =>
				this.crypto.verifyOtp('webauthn_registration', user.email, value, challenge.codeHash),
			expectedOrigin: this.config.webAuthnOrigin,
			expectedRPID: this.config.webAuthnRpId,
			requireUserVerification: true,
		});
		if (!verification.verified) throw invalidPasskey();
		if (!(await this.repository.consumeChallenge(challenge.id))) throw invalidPasskey();
		const { credential, credentialBackedUp, credentialDeviceType } = verification.registrationInfo;
		const passkey = await this.repository.create({
			userId: input.userId,
			credentialId: credential.id,
			publicKey: Buffer.from(credential.publicKey).toString('base64url'),
			counter: credential.counter,
			transports: input.response.response.transports ?? credential.transports ?? [],
			deviceType: credentialDeviceType,
			backedUp: credentialBackedUp,
			name: input.name.trim().slice(0, 100) || 'Passkey',
		});
		return toPasskeyView(passkey);
	}

	async beginAuthentication(email: string) {
		const user = await this.users.findByEmail(email);
		if (!user?.isActive) throw invalidPasskey();
		const passkeys = await this.repository.listForUser(user.id);
		if (passkeys.length === 0) throw invalidPasskey();
		const options = await generateAuthenticationOptions({
			rpID: this.config.webAuthnRpId,
			allowCredentials: passkeys.map((passkey) => ({
				id: passkey.credentialId,
				transports: passkey.transports as AuthenticatorTransportFuture[],
			})),
			userVerification: 'required',
		});
		const challenge = await this.repository.createChallenge({
			userId: user.id,
			email: user.email,
			purpose: 'webauthn_authentication',
			challengeHash: this.crypto.hashOtp('webauthn_authentication', user.email, options.challenge),
			expiresAt: new Date(Date.now() + this.config.mfaChallengeTtlMinutes * 60_000),
		});
		return { challengeId: challenge.id, options };
	}

	async finishAuthentication(input: {
		email: string;
		challengeId: string;
		response: AuthenticationResponseJSON;
	}) {
		const user = await this.users.findByEmail(input.email);
		if (!user?.isActive) throw invalidPasskey();
		const challenge = await this.requireChallenge(
			input.challengeId,
			user.id,
			'webauthn_authentication',
		);
		const passkey = await this.repository.findByCredentialId(input.response.id);
		if (!passkey || passkey.userId !== user.id) throw invalidPasskey();
		const verification = await verifyAuthenticationResponse({
			response: input.response,
			expectedChallenge: (value) =>
				this.crypto.verifyOtp('webauthn_authentication', user.email, value, challenge.codeHash),
			expectedOrigin: this.config.webAuthnOrigin,
			expectedRPID: this.config.webAuthnRpId,
			requireUserVerification: true,
			credential: {
				id: passkey.credentialId,
				publicKey: new Uint8Array(Buffer.from(passkey.publicKey, 'base64url')),
				counter: passkey.counter,
				transports: passkey.transports as AuthenticatorTransportFuture[],
			},
		});
		if (!verification.verified) throw invalidPasskey();
		if (!(await this.repository.consumeChallenge(challenge.id))) throw invalidPasskey();
		await this.repository.updateUsage(passkey.id, verification.authenticationInfo.newCounter);
		return user;
	}

	async list(userId: string) {
		return (await this.repository.listForUser(userId)).map(toPasskeyView);
	}

	async remove(userId: string, passkeyId: string): Promise<{ deleted: true }> {
		if (!(await this.repository.delete(userId, passkeyId))) {
			throw new BadRequestException({ code: 'PASSKEY_NOT_FOUND', message: 'Passkey not found' });
		}
		return { deleted: true };
	}

	private async requireChallenge(
		challengeId: string,
		userId: string,
		purpose: 'webauthn_registration' | 'webauthn_authentication',
	): Promise<AuthChallengeRecord> {
		const challenge = await this.repository.findChallenge(challengeId);
		if (
			!challenge ||
			challenge.userId !== userId ||
			challenge.purpose !== purpose ||
			challenge.consumedAt ||
			challenge.expiresAt <= new Date()
		) {
			throw invalidPasskey();
		}
		return challenge;
	}
}

function toPasskeyView(passkey: {
	id: string;
	name: string;
	deviceType: string;
	backedUp: boolean;
	lastUsedAt: Date | null;
	createdAt: Date;
}) {
	return {
		id: passkey.id,
		name: passkey.name,
		deviceType: passkey.deviceType,
		backedUp: passkey.backedUp,
		lastUsedAt: passkey.lastUsedAt?.toISOString() ?? null,
		createdAt: passkey.createdAt.toISOString(),
	};
}

function invalidPasskey(): UnauthorizedException {
	return new UnauthorizedException({
		code: 'PASSKEY_INVALID',
		message: 'Passkey authentication could not be completed',
	});
}
