import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { SocialAuthRepository } from './social-auth.repository';
import { SocialAuthService } from './social-auth.service';

@Module({
	imports: [UsersModule],
	providers: [SocialAuthRepository, SocialAuthService],
	exports: [SocialAuthService],
})
export class SocialAuthModule {}
