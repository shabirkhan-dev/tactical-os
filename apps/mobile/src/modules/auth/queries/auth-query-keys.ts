export const authQueryKeys = {
	all: ["auth"] as const,
	sessions: (userId: string | undefined) => [...authQueryKeys.all, "sessions", userId] as const,
	security: (userId: string | undefined) => [...authQueryKeys.all, "security", userId] as const,
};
