import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import type { RequestWithId } from '../../common/types/request-with-id.type';
import { AuthService } from './auth.service';
import type { AuthTokenPayload } from './auth.types';

export type AuthenticatedRequest = RequestWithId & {
	user?: AuthTokenPayload;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
		const header = request.headers.authorization;

		if (!header?.startsWith('Bearer ')) {
			throw new UnauthorizedException({
				code: 'UNAUTHORIZED',
				message: 'Authentication required',
			});
		}

		const token = header.slice('Bearer '.length).trim();
		if (!token) {
			throw new UnauthorizedException({
				code: 'UNAUTHORIZED',
				message: 'Authentication required',
			});
		}

		request.user = await this.authService.verifyAccessToken(token);
		return true;
	}
}
