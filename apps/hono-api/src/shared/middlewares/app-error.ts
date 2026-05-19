import type { Context } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { createLogger } from "@school-os/logger";
import { z } from "zod";
import { appConfig } from "@/shared/configs/app-config";
import type { HttpCode } from "@/shared/configs/http-config";
import { getMessage, HTTP_CODE } from "@/shared/configs/http-config";
import type { ErrorCode } from "@/shared/errors/error-enum";
import { ErrorCode as ErrorCodeEnum } from "@/shared/errors/error-enum";
import { clearAuthenticationCookies, REFRESH_PATH } from "@/shared/utils/cookie";

const log = createLogger({ prefix: "app-error" });

export class AppError extends Error {
	constructor(
		public readonly code: HttpCode,
		message?: string,
		public readonly details?: unknown,
		public readonly errorCode?: ErrorCode,
	) {
		super(message ?? getMessage(code));
		this.name = "AppError";
	}
}

function formatZodError(error: z.ZodError): { field: string; message: string }[] {
	return error.issues.map((issue: z.ZodIssue) => ({
		field: issue.path.join("."),
		message: issue.message,
	}));
}

export function appErrorHandler(err: unknown, c: Context) {
	const path = c.req.path;
	log.error(`Error occurred on PATH: ${path}`, err);

	if (path === REFRESH_PATH) {
		clearAuthenticationCookies(c);
	}

	if (err instanceof SyntaxError) {
		return c.json(
			{
				success: false,
				code: HTTP_CODE.BAD_REQUEST,
				message: "Invalid JSON format, please check your request body",
				errorCode: ErrorCodeEnum.VALIDATION_ERROR,
			},
			HTTP_CODE.BAD_REQUEST as ContentfulStatusCode,
		);
	}

	if (err instanceof z.ZodError) {
		const errors = formatZodError(err);
		return c.json(
			{
				success: false,
				code: HTTP_CODE.BAD_REQUEST,
				message: "Validation failed",
				errorCode: ErrorCodeEnum.VALIDATION_ERROR,
				errors,
			},
			HTTP_CODE.BAD_REQUEST as ContentfulStatusCode,
		);
	}

	if (err instanceof AppError) {
		return c.json(
			{
				success: false,
				code: err.code,
				message: err.message,
				...(err.errorCode != null && { errorCode: err.errorCode }),
				...(err.details != null && { details: err.details }),
			},
			err.code as ContentfulStatusCode,
		);
	}

	const message = err instanceof Error ? err.message : "Unknown error occurred";
	const isDev = appConfig.env === "development";
	return c.json(
		{
			success: false,
			code: HTTP_CODE.INTERNAL_SERVER_ERROR,
			message: getMessage(HTTP_CODE.INTERNAL_SERVER_ERROR),
			errorCode: ErrorCodeEnum.INTERNAL_SERVER_ERROR,
			...(isDev && { details: message }),
		},
		HTTP_CODE.INTERNAL_SERVER_ERROR as ContentfulStatusCode,
	);
}
