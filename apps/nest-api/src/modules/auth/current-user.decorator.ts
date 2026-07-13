import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import type { AccessTokenPayload } from './auth.types';
import type { AuthenticatedRequest } from './jwt-auth.guard';

export const CurrentUser = createParamDecorator(
	(_data: unknown, context: ExecutionContext): AccessTokenPayload => {
		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		if (!request.user) {
			throw new Error('CurrentUser used outside JwtAuthGuard');
		}
		return request.user;
	},
);
