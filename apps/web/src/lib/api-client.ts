import { getApiOrigin } from "@/lib/api/client";
import { authService } from "@/modules/auth/services";
import { usersService } from "@/modules/users/services";

export { ApiError } from "@/lib/api/client";

export const getBaseUrl = getApiOrigin;
export const register = authService.register;
export const verifyEmail = authService.verifyEmail;
export const resendVerification = authService.resendVerification;
export const login = authService.login;
export const refreshSession = authService.refresh;
export const logout = authService.logout;
export const logoutAll = authService.logoutAll;
export const forgotPassword = authService.forgotPassword;
export const resetPassword = authService.resetPassword;
export const changePassword = authService.changePassword;
export const listSessions = authService.listSessions;
export const revokeSession = authService.revokeSession;
export const me = usersService.getCurrent;
export const updateProfile = usersService.updateProfile;
