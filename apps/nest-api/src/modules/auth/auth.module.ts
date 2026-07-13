import { Module } from '@nestjs/common';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthCryptoService } from './auth-crypto.service';
import { AuthEmailService } from './auth-email.service';
import { CsrfGuard } from './csrf.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshCookieService } from './refresh-cookie.service';

@Module({
	imports: [UsersModule],
	controllers: [AuthController],
	providers: [
		AuthRepository,
		AuthCryptoService,
		AuthEmailService,
		AuthService,
		CsrfGuard,
		JwtAuthGuard,
		RefreshCookieService,
	],
	exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
