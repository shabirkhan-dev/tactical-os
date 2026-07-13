import { z } from 'zod';

export const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	PORT: z.coerce.number().int().positive().default(4000),
	API_PREFIX: z.string().min(1).default('api'),
	API_VERSION: z.string().regex(/^\d+$/).default('1'),
	SERVICE_NAME: z.string().min(1).default('school-os-api'),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(env: NodeJS.ProcessEnv = process.env): Env {
	const result = envSchema.safeParse(env);

	if (result.success) {
		return result.data;
	}

	const issues = result.error.issues
		.map((issue) => `${issue.path.join('.')}: ${issue.message}`)
		.join('; ');

	throw new Error(`Invalid environment configuration: ${issues}`);
}
