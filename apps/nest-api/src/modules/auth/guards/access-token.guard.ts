import {
	CanActivate,
	type ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from '../auth.service';
import type { AuthenticatedRequestUser } from '../types/authenticated-request-user.type';

@Injectable()
export class AccessTokenGuard implements CanActivate {
	constructor(private readonly authService: AuthService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context
			.switchToHttp()
			.getRequest<Request & { user?: AuthenticatedRequestUser }>();
		const authorizationHeader = request.headers.authorization;
		const token = authorizationHeader?.replace(/^Bearer\s+/i, '');

		if (!token) {
			throw new UnauthorizedException('Missing or invalid token');
		}

		const payload = await this.authService.verifyAccessToken(token);
		request.user = payload;
		return true;
	}
}
