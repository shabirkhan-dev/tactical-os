import { Module } from '@nestjs/common';
import { AuthCryptoModule } from '../auth/auth-crypto.module';
import { UsersModule } from '../users/users.module';
import { MfaRepository } from './mfa.repository';
import { MfaService } from './mfa.service';

@Module({
	imports: [UsersModule, AuthCryptoModule],
	providers: [MfaRepository, MfaService],
	exports: [MfaService],
})
export class MfaModule {}
