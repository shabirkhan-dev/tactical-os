import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import type { AuthTokenPayload, AuthUser, LoginResult } from './auth.types';
import { CurrentUser } from './current-user.decorator';
import { LoginBodyDto, RegisterBodyDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller({
	path: 'auth',
	version: '1',
})
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	register(@Body() body: RegisterBodyDto): Promise<AuthUser> {
		return this.authService.register(body);
	}

	@Post('login')
	@HttpCode(HttpStatus.OK)
	login(@Body() body: LoginBodyDto): Promise<LoginResult> {
		return this.authService.login(body);
	}

	@Get('me')
	@UseGuards(JwtAuthGuard)
	me(@CurrentUser() user: AuthTokenPayload): Promise<AuthUser> {
		return this.authService.me(user.sub);
	}
}
