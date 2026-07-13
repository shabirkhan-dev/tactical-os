import { Body, Controller, Get, HttpCode, HttpStatus, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import type { AccessTokenPayload } from '../auth/auth.types';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateProfileDto } from './profiles.dto';
import { ProfilesService } from './profiles.service';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'users/me', version: '1' })
export class ProfilesController {
	constructor(private readonly profiles: ProfilesService) {}

	@Get()
	@ApiOperation({ summary: 'Get the authenticated user and profile' })
	getCurrent(@CurrentUser() user: AccessTokenPayload) {
		return this.profiles.getCurrent(user.sub);
	}

	@Patch('profile')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'Update the authenticated user profile' })
	update(@CurrentUser() user: AccessTokenPayload, @Body() body: UpdateProfileDto) {
		return this.profiles.update(user.sub, body);
	}
}
