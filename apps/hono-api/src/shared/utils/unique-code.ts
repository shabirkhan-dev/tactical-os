import { randomBytes } from "node:crypto";

/** Generates a URL-safe unique code (e.g. for verification links). Default 32 chars. */
export function generateUniqueCode(length = 32): string {
	return randomBytes(length).toString("base64url");
}
