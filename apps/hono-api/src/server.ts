import "./load-env";
import { createLogger } from "@starter/logger";
import { serve } from "bun";
import app from "@/app";
import { appConfig } from "@/shared/configs/app-config";
import { connectPrisma } from "@/shared/lib/prisma";

const log = createLogger({ prefix: appConfig.name });

async function startServer() {
	try {
		await connectPrisma();
		log.info("Database connected");
	} catch (e) {
		log.error("Database connection failed", e);
		throw e;
	}

	serve({
		fetch: app.fetch,
		port: appConfig.port,
		hostname: appConfig.host,
	});

	log.info(`v${appConfig.version} listening on http://${appConfig.host}:${appConfig.port}`);
}

startServer();
