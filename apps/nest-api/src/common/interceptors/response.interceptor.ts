import { CallHandler, ExecutionContext, Injectable, type NestInterceptor } from '@nestjs/common';
import { map, type Observable } from 'rxjs';

type ApiResponse<T> = {
	success: true;
	code: number;
	message: string;
	data?: T;
};

@Injectable()
export class ResponseInterceptor<T>
	implements NestInterceptor<T | { message?: string; data?: T }, ApiResponse<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler<T | { message?: string; data?: T }>,
	): Observable<ApiResponse<T>> {
		const response = context.switchToHttp().getResponse<{ statusCode: number }>();

		return next.handle().pipe(
			map((result) => {
				if (result && typeof result === 'object' && 'message' in result && 'data' in result) {
					const body = result as { message?: string; data?: T };
					return {
						success: true,
						code: response.statusCode,
						message: body.message ?? 'OK',
						data: body.data,
					};
				}

				return {
					success: true,
					code: response.statusCode,
					message: 'OK',
					data: result as T,
				};
			}),
		);
	}
}
