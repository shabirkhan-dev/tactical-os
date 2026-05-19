import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { appConfig } from "@/shared/configs/app-config";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

function createPrisma(): PrismaClient {
	const url = appConfig.databaseUrl;
	if (!url || url.trim() === "") {
		throw new Error("DATABASE_URL is required for Prisma");
	}
	const connectionString = url.trim();
	const adapter = new PrismaPg({ connectionString });
	return new PrismaClient({
		adapter,
		log: appConfig.env === "development" ? ["query", "error", "warn"] : ["error"],
	});
}

let connectPromise: Promise<void> | null = null;

function getPrisma(): PrismaClient {
	if (globalForPrisma.prisma) return globalForPrisma.prisma;
	const client = createPrisma();
	globalForPrisma.prisma = client;
	connectPromise = client.$connect();
	return client;
}

/** Call once at startup to verify DB connection and avoid first-request "Invalid invocation". */
export async function connectPrisma(): Promise<void> {
	getPrisma();
	if (connectPromise) await connectPromise;
	connectPromise = null;
}

/** Lazy-initialized Prisma client (avoids "Invalid invocation" when env loads after imports). */
export const prisma = new Proxy({} as PrismaClient, {
	get(_, prop) {
		return (getPrisma() as Record<string, unknown>)[prop as string];
	},
});
