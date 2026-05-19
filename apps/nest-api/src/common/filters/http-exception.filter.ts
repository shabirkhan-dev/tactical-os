import {
	ArgumentsHost,
	Catch,
	type ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';

type ErrorResponse = {
	message: string;
	error?: string;
};

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();

		if (exception instanceof HttpException) {
			const status = exception.getStatus();
			const exceptionResponse = exception.getResponse();
			const payload =
				typeof exceptionResponse === 'string'
					? { message: exceptionResponse }
					: (exceptionResponse as ErrorResponse);

			response.status(status).json({
				success: false,
				code: status,
				message: payload.message ?? 'Request failed',
				error: payload.error,
				path: request.url,
				timestamp: new Date().toISOString(),
			});
			return;
		}

		response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
			success: false,
			code: HttpStatus.INTERNAL_SERVER_ERROR,
			message: 'Internal server error',
			path: request.url,
			timestamp: new Date().toISOString(),
		});
	}
}
