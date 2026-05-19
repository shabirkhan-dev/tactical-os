/**
 * HTTP status codes and messages. Use for consistent responses and error handling.
 */

export const HTTP_CODE = {
	OK: 200,
	CREATED: 201,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	CONFLICT: 409,
	UNPROCESSABLE_ENTITY: 422,
	TOO_MANY_REQUESTS: 429,
	INTERNAL_SERVER_ERROR: 500,
	SERVICE_UNAVAILABLE: 503,
} as const;

export const HTTP_MESSAGE: Record<number, string> = {
	[HTTP_CODE.OK]: "OK",
	[HTTP_CODE.CREATED]: "Created",
	[HTTP_CODE.NO_CONTENT]: "No Content",
	[HTTP_CODE.BAD_REQUEST]: "Bad Request",
	[HTTP_CODE.UNAUTHORIZED]: "Unauthorized",
	[HTTP_CODE.FORBIDDEN]: "Forbidden",
	[HTTP_CODE.NOT_FOUND]: "Not Found",
	[HTTP_CODE.CONFLICT]: "Conflict",
	[HTTP_CODE.UNPROCESSABLE_ENTITY]: "Unprocessable Entity",
	[HTTP_CODE.TOO_MANY_REQUESTS]: "Too Many Requests",
	[HTTP_CODE.INTERNAL_SERVER_ERROR]: "Internal Server Error",
	[HTTP_CODE.SERVICE_UNAVAILABLE]: "Service Unavailable",
};

export type HttpCode = (typeof HTTP_CODE)[keyof typeof HTTP_CODE];

export type HttpMessage = (typeof HTTP_MESSAGE)[HttpCode];

export function getMessage(code: HttpCode): string {
	return HTTP_MESSAGE[code] ?? "Unknown";
}
