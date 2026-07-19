import { Module } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';
import { AvatarStorageService } from './avatar-storage.service';
import { ProfilesController } from './profiles.controller';
import { ProfilesRepository } from './profiles.repository';
import { ProfilesService } from './profiles.service';

@Module({
	imports: [AuthModule, UsersModule],
	controllers: [ProfilesController],
	providers: [ProfilesRepository, ProfilesService, AvatarStorageService],
})
export class ProfilesModule {}
