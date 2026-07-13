import { z } from "zod";

export const emailSchema = z.email().trim().toLowerCase().max(320);
export const loginSchema = z.object({ email: emailSchema, password: z.string().min(1).max(128) });
export const twoFactorSchema = z.object({
	challengeToken: z.string().min(20),
	code: z.string().trim().min(6).max(32),
});
export const magicLinkRequestSchema = z.object({ email: emailSchema });
