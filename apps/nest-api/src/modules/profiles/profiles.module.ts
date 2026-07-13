import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ProfilesController } from './profiles.controller';
import { ProfilesRepository } from './profiles.repository';
import { ProfilesService } from './profiles.service';

@Module({
	imports: [AuthModule, UsersModule],
	controllers: [ProfilesController],
	providers: [ProfilesRepository, ProfilesService],
})
export class ProfilesModule {}
