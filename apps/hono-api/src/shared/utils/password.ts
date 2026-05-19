/**
 * Password hashing and verification. Uses Bun.password when available, else a sync bcrypt fallback.
 */

export async function hashPassword(plain: string): Promise<string> {
	if (typeof Bun !== "undefined" && Bun.password) {
		return Bun.password.hash(plain, { algorithm: "bcrypt", cost: 10 });
	}
	// Node: use dynamic import so Bun-only builds don't require bcrypt
	const { hash } = await import("bcryptjs");
	return hash(plain, 10);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
	if (typeof Bun !== "undefined" && Bun.password) {
		return Bun.password.verify(plain, hash, "bcrypt");
	}
	const { compare } = await import("bcryptjs");
	return compare(plain, hash);
}
