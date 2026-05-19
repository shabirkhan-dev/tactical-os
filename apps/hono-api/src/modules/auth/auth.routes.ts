import { Hono } from "hono";
import type { AuthEnv } from "./jwt.middleware";
import { authenticateJWT } from "./jwt.middleware";
import { createAuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authService = new AuthService();
const authController = createAuthController(authService);

const auth = new Hono<{ Variables: AuthEnv }>();

auth.post("/register", (c) => authController.register(c));
auth.post("/login", (c) => authController.login(c));
auth.post("/verify/email", (c) => authController.verifyEmail(c));
auth.post("/password/forgot", (c) => authController.forgotPassword(c));
auth.post("/password/reset", (c) => authController.resetPassword(c));
auth.get("/refresh", (c) => authController.refreshToken(c));
auth.post("/logout", authenticateJWT, (c) => authController.logout(c));
auth.get("/me", authenticateJWT, (c) => authController.me(c));

// Sessions and 2FA (authenticated)
auth.get("/sessions", authenticateJWT, (c) => authController.listSessions(c));
auth.delete("/sessions/:id", authenticateJWT, (c) => authController.deleteSession(c));
auth.post("/2fa/setup", authenticateJWT, (c) => authController.setup2FA(c));
auth.post("/2fa/enable", authenticateJWT, (c) => authController.enable2FA(c));
auth.post("/2fa/disable", authenticateJWT, (c) => authController.disable2FA(c));

export default auth;
