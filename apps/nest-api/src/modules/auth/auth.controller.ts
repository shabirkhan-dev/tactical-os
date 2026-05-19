import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthService } from './auth.service';
import type { LoginDto } from './dto/login.dto';
import type { RefreshTokenDto } from './dto/refresh-token.dto';
import type { RegisterDto } from './dto/register.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import type { AuthenticatedRequestUser } from './types/authenticated-request-user.type';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	register(@Body() body: RegisterDto) {
		return this.authService.register(body);
	}

	@Post('login')
	login(@Body() body: LoginDto, @Req() request: Request) {
		return this.authService.login(body, request);
	}

	@Post('refresh')
	refresh(@Body() body: RefreshTokenDto) {
		return this.authService.refreshToken(body);
	}

	@UseGuards(AccessTokenGuard)
	@Get('me')
	me(@CurrentUser() user: AuthenticatedRequestUser) {
		return this.authService.me(user.userId);
	}

	@UseGuards(AccessTokenGuard)
	@Post('logout')
	logout(@CurrentUser() user: AuthenticatedRequestUser) {
		return this.authService.logout(user.sessionId);
	}
}
