import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/access-token.guard';

@Module({
	imports: [JwtModule.register({})],
	controllers: [AuthController],
	providers: [AuthService, AuthRepository, AccessTokenGuard],
})
export class AuthModule {}
