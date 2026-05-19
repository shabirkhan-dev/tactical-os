import { Hono } from "hono";
import { cors } from "hono/cors";
import { appConfig } from "@/shared/configs/app-config";
import { HTTP_CODE } from "@/shared/configs/http-config";
import { appErrorHandler } from "@/shared/middlewares/app-error";
import { getEnv } from "@/shared/utils/get-env";
import authRoutes from "@/modules/auth/auth.routes";

const app = new Hono();

// Comma-separated origins from env, or default to localhost:3000 and :3001
const corsOriginEnv = getEnv("CORS_ORIGIN", "http://localhost:3000,http://localhost:3001");
const corsOrigins = corsOriginEnv
	.split(",")
	.map((o) => o.trim())
	.filter(Boolean);
app.use(
	"*",
	cors({
		origin:
			corsOrigins.length > 0 ? corsOrigins : ["http://localhost:3000", "http://localhost:3001"],
		allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.onError(appErrorHandler);

app.get("/", (c) => {
	return c.json({
		success: true,
		code: HTTP_CODE.OK,
		message: "OK",
		data: { name: appConfig.name, version: appConfig.version },
	});
});

app.get("/health", (c) => {
	return c.json({
		success: true,
		code: HTTP_CODE.OK,
		message: "OK",
		data: { status: "ok", env: appConfig.env },
	});
});

app.route("/auth", authRoutes);

export default app;
