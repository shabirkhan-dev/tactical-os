import * as z from 'zod';

export const assistMessageSchema = z
	.object({
		role: z.enum(['user', 'assistant', 'system']),
		content: z.string().trim().min(1).max(8_000),
	})
	.strict();

export const assistRequestSchema = z
	.object({
		messages: z.array(assistMessageSchema).min(1).max(40),
		context: z.string().trim().max(4_000).optional(),
	})
	.strict();

export class AssistRequestDto {
	static schema = assistRequestSchema;
	messages!: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
	context?: string;
}

export type AssistRequestInput = z.infer<typeof assistRequestSchema>;

export type AssistResponse = {
	reply: string;
	provider: string;
	model: string;
};
