import { z } from 'zod';

export const registerBodySchema = z.object({
	email: z.email().trim().toLowerCase(),
	username: z
		.string()
		.trim()
		.min(2)
		.max(64)
		.regex(
			/^[a-zA-Z0-9._-]+$/,
			'Username may only contain letters, numbers, dots, underscores, and hyphens',
		),
	password: z.string().min(8).max(128),
});

export const loginBodySchema = z.object({
	email: z.email().trim().toLowerCase(),
	password: z.string().min(1).max(128),
});

export class RegisterBodyDto {
	static schema = registerBodySchema;

	email!: string;
	username!: string;
	password!: string;
}

export class LoginBodyDto {
	static schema = loginBodySchema;

	email!: string;
	password!: string;
}

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
