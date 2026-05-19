import { z } from "zod";

const emailSchema = z.string().email("Invalid email");

export const registerSchema = z.object({
	name: z.string().min(1, "Name is required").max(200),
	email: emailSchema,
	password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
	email: emailSchema,
	password: z.string().min(1, "Password is required"),
	userAgent: z.string().optional(),
});

export const verificationEmailSchema = z.object({
	code: z.string().min(1, "Verification code is required"),
});

export const forgotPasswordSchema = z.object({
	email: emailSchema,
});

export const resetPasswordSchema = z.object({
	password: z.string().min(8, "Password must be at least 8 characters"),
	verificationCode: z.string().min(1, "Verification code is required"),
});

export const enable2FASchema = z.object({
	code: z.string().length(6, "Code must be 6 digits").regex(/^\d+$/, "Code must be digits only"),
});

export const disable2FASchema = z.object({
	password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type Enable2FAInput = z.infer<typeof enable2FASchema>;
export type Disable2FAInput = z.infer<typeof disable2FASchema>;
