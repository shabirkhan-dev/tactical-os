export const userQueryKeys = {
	all: ["users"] as const,
	current: () => [...userQueryKeys.all, "current"] as const,
};
