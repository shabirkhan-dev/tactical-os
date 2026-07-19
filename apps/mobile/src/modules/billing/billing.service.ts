import { apiClient } from "@/lib/api/client";
import type {
	BillingInterval,
	CheckoutResult,
	PaymentProviderName,
	PlanCode,
	PortalResult,
	SubscriptionView,
} from "./types/billing.types";

export type {
	BillingInterval,
	CheckoutResult,
	PaymentProviderName,
	PlanCode,
	PortalResult,
	SubscriptionView,
} from "./types/billing.types";

export const billingService = {
	listProviders: (accessToken?: string) =>
		apiClient.get<{ providers: PaymentProviderName[] }>("/billing/providers", { accessToken }),
	getSubscription: (accessToken: string) =>
		apiClient.get<{ subscription: SubscriptionView }>("/billing/subscription", { accessToken }),
	createCheckout: (
		accessToken: string,
		input: {
			provider?: PaymentProviderName;
			planCode: PlanCode;
			billingInterval?: BillingInterval;
			successUrl?: string;
			cancelUrl?: string;
		},
	) => apiClient.post<CheckoutResult>("/billing/checkout", input, { accessToken }),
	createPortal: (
		accessToken: string,
		input?: { provider?: PaymentProviderName; returnUrl?: string },
	) => apiClient.post<PortalResult>("/billing/portal", input ?? {}, { accessToken }),
};
