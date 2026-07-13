import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import type { UpdateProfileInput } from './profiles.dto';
import { ProfilesRepository } from './profiles.repository';

@Injectable()
export class ProfilesService {
	constructor(
		private readonly repository: ProfilesRepository,
		private readonly users: UsersService,
	) {}

	async getCurrent(userId: string) {
		const [user, profile] = await Promise.all([
			this.users.getCurrentUser(userId),
			this.repository.findByUserId(userId),
		]);
		return { ...user, profile: toProfileView(profile) };
	}

	async update(userId: string, input: UpdateProfileInput) {
		if (input.username) {
			await this.users.updateProfile(userId, { username: input.username });
		}
		const { username: _username, ...profileInput } = input;
		if (Object.keys(profileInput).length > 0) {
			await this.repository.upsert(userId, profileInput);
		}
		return this.getCurrent(userId);
	}
}

function toProfileView(
	profile: {
		displayName: string | null;
		avatarUrl: string | null;
		bio: string | null;
		timezone: string | null;
		locale: string | null;
	} | null,
) {
	return {
		displayName: profile?.displayName ?? null,
		avatarUrl: profile?.avatarUrl ?? null,
		bio: profile?.bio ?? null,
		timezone: profile?.timezone ?? null,
		locale: profile?.locale ?? null,
	};
}
