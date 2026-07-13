import { z } from "zod";

const optionalText = (maximum: number) => z.string().trim().max(maximum).nullable().optional();

export const updateUserProfileSchema = z
	.object({
		username: z
			.string()
			.trim()
			.toLowerCase()
			.min(3)
			.max(64)
			.regex(/^[a-z0-9._-]+$/)
			.optional(),
		displayName: optionalText(100),
		avatarUrl: z.url().max(2048).nullable().optional(),
		bio: optionalText(280),
		timezone: optionalText(64),
		locale: optionalText(16),
	})
	.refine((value) => Object.keys(value).length > 0, "At least one field is required");
