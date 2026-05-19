import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { AuthenticatedRequestUser } from '../../modules/auth/types/authenticated-request-user.type';

export const CurrentUser = createParamDecorator(
	(_data: unknown, context: ExecutionContext): AuthenticatedRequestUser => {
		const request = context.switchToHttp().getRequest<{ user: AuthenticatedRequestUser }>();
		return request.user;
	},
);
