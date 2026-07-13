import { Module } from '@nestjs/common';

import { AuthCryptoService } from './auth-crypto.service';

@Module({
	providers: [AuthCryptoService],
	exports: [AuthCryptoService],
})
export class AuthCryptoModule {}
