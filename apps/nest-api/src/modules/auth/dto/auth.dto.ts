import { z } from 'zod';

const emailSchema = z.email().trim().toLowerCase().max(320);
const passwordSchema = z.string().min(12).max(128);
const otpSchema = z.string().regex(/^\d{6}$/, 'Code must contain exactly 6 digits');

export const registerBodySchema = z
	.object({
		email: emailSchema,
		username: z
			.string()
			.trim()
			.toLowerCase()
			.min(3)
			.max(64)
			.regex(
				/^[a-z0-9._-]+$/,
				'Username may only contain lowercase letters, numbers, dots, underscores, and hyphens',
			),
		password: passwordSchema,
	})
	.strict();

export const loginBodySchema = z
	.object({ email: emailSchema, password: z.string().min(1).max(128) })
	.strict();
export const emailBodySchema = z.object({ email: emailSchema }).strict();
export const verifyEmailBodySchema = z.object({ email: emailSchema, code: otpSchema }).strict();
export const resetPasswordBodySchema = z
	.object({ email: emailSchema, code: otpSchema, newPassword: passwordSchema })
	.strict();
export const changePasswordBodySchema = z
	.object({
		currentPassword: z.string().min(1).max(128),
		newPassword: passwordSchema,
	})
	.strict()
	.refine((input) => input.currentPassword !== input.newPassword, {
		path: ['newPassword'],
		message: 'New password must be different from the current password',
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
export class EmailBodyDto {
	static schema = emailBodySchema;
	email!: string;
}
export class VerifyEmailBodyDto {
	static schema = verifyEmailBodySchema;
	email!: string;
	code!: string;
}
export class ResetPasswordBodyDto {
	static schema = resetPasswordBodySchema;
	email!: string;
	code!: string;
	newPassword!: string;
}
export class ChangePasswordBodyDto {
	static schema = changePasswordBodySchema;
	currentPassword!: string;
	newPassword!: string;
}

export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginBody = z.infer<typeof loginBodySchema>;
export type EmailBody = z.infer<typeof emailBodySchema>;
export type VerifyEmailBody = z.infer<typeof verifyEmailBodySchema>;
export type ResetPasswordBody = z.infer<typeof resetPasswordBodySchema>;
export type ChangePasswordBody = z.infer<typeof changePasswordBodySchema>;
