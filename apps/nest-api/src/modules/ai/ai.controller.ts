import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';
import type { AccessTokenPayload } from '../auth/auth.types';
import { CurrentUser } from '../auth/current-user.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AssistRequestDto, assistRequestSchema } from './ai.dto';
import { AiService } from './ai.service';

@ApiTags('AI')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller({ path: 'ai', version: '1' })
export class AiController {
	constructor(private readonly ai: AiService) {}

	@Get('status')
	@ApiOperation({ summary: 'Check AI assistance upstream availability' })
	status() {
		return this.ai.status();
	}

	@Post('assist')
	@HttpCode(HttpStatus.OK)
	@ApiOperation({ summary: 'In-app AI assistance (proxied to FastAPI)' })
	assist(
		@CurrentUser() user: AccessTokenPayload,
		@Body(new ZodValidationPipe(assistRequestSchema)) body: AssistRequestDto,
	) {
		return this.ai.assist(user.sub, body);
	}
}
