"use client";

import { createContext, type ReactNode, useContext, useMemo } from "react";
import {
	AnimatedToastStack,
	type ToastInput,
	type ToastPosition,
	useAnimatedToastStack,
} from "./motion/animated-toast-stack";

type ToastApi = {
	show: (input: ToastInput) => string;
	update: (id: string, patch: Partial<ToastInput>) => void;
	dismiss: (id: string) => void;
	clear: () => void;
};

const ToastContext = createContext<ToastApi | null>(null);

export function ToastProvider({
	children,
	position = "bottom-right",
	defaultDuration = 4200,
	limit = 5,
}: {
	children: ReactNode;
	position?: ToastPosition;
	defaultDuration?: number;
	limit?: number;
}) {
	const stack = useAnimatedToastStack({ defaultDuration, limit });

	const api = useMemo<ToastApi>(
		() => ({
			show: stack.showToast,
			update: stack.updateToast,
			dismiss: stack.dismissToast,
			clear: stack.clearToasts,
		}),
		[stack.clearToasts, stack.dismissToast, stack.showToast, stack.updateToast],
	);

	return (
		<ToastContext.Provider value={api}>
			{children}
			<AnimatedToastStack
				toasts={stack.toasts}
				onDismiss={stack.dismissToast}
				position={position}
				fixed
			/>
		</ToastContext.Provider>
	);
}

/** @deprecated Prefer `ToastProvider` — kept as a familiar mount name for layouts. */
export function Toaster({
	children,
	position = "bottom-right",
}: {
	children?: ReactNode;
	position?: ToastPosition;
}) {
	return <ToastProvider position={position}>{children ?? null}</ToastProvider>;
}

export function useToast(): ToastApi {
	const ctx = useContext(ToastContext);
	if (!ctx) {
		throw new Error("useToast must be used within ToastProvider");
	}
	return ctx;
}

export {
	type AnimatedToast,
	AnimatedToastStack,
	type ToastInput,
	type ToastPosition,
	type ToastStatus,
	useAnimatedToastStack,
} from "./motion/animated-toast-stack";
