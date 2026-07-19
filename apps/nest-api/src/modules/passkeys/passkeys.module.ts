import { Module } from '@nestjs/common';
import { AuthCryptoModule } from '@/modules/auth/auth-crypto.module';
import { UsersModule } from '@/modules/users/users.module';
import { PasskeysRepository } from './passkeys.repository';
import { PasskeysService } from './passkeys.service';

@Module({
	imports: [UsersModule, AuthCryptoModule],
	providers: [PasskeysRepository, PasskeysService],
	exports: [PasskeysService],
})
export class PasskeysModule {}
