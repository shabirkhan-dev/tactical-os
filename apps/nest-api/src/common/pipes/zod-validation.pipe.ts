import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import type { ZodIssue, ZodType } from 'zod';

type ZodSchemaProvider = Function & {
	schema?: ZodType<unknown>;
	zodSchema?: ZodType<unknown>;
};

export type ValidationErrorItem = {
	code: string;
	path: string;
	message: string;
};

@Injectable()
export class ZodValidationPipe implements PipeTransform {
	constructor(private readonly schema?: ZodType<unknown>) {}

	transform(value: unknown, metadata: ArgumentMetadata): unknown {
		const schema = this.schema ?? getSchemaFromMetadata(metadata);

		if (!schema) {
			return value;
		}

		const result = schema.safeParse(value);

		if (result.success) {
			return result.data;
		}

		throw new BadRequestException({
			code: 'VALIDATION_ERROR',
			message: 'Request validation failed',
			errors: result.error.issues.map(toValidationErrorItem),
		});
	}
}

function getSchemaFromMetadata(metadata: ArgumentMetadata): ZodType<unknown> | undefined {
	const metatype = metadata.metatype as ZodSchemaProvider | undefined;

	return metatype?.zodSchema ?? metatype?.schema;
}

function toValidationErrorItem(issue: ZodIssue): ValidationErrorItem {
	return {
		code: issue.code,
		path: issue.path.join('.'),
		message: issue.message,
	};
}
