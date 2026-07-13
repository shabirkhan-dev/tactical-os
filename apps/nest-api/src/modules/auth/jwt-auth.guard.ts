import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import type { RequestWithId } from '../../common/types/request-with-id.type';
import { AuthService } from './auth.service';
import type { AccessTokenPayload } from './auth.types';

export type AuthenticatedRequest = RequestWithId & { user?: AccessTokenPayload };

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		const header = request.headers.authorization;
		if (!header?.startsWith('Bearer ')) {
			throw authRequired();
		}
		const token = header.slice('Bearer '.length).trim();
		if (!token) {
			throw authRequired();
		}
		request.user = await this.authService.authenticateAccessToken(token);
		return true;
	}
}

function authRequired(): UnauthorizedException {
	return new UnauthorizedException({
		code: 'AUTH_REQUIRED',
		message: 'Authentication required',
	});
}
