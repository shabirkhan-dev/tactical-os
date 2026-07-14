import { apiClient } from "@/lib/api/client";

export type PaymentProviderName = "stripe" | "razorpay";
export type PlanCode = "team" | "enterprise";
export type BillingInterval = "monthly" | "yearly";

export type CheckoutResult = {
	provider: PaymentProviderName;
	checkoutUrl: string;
	providerSessionId?: string;
};

export type PortalResult = {
	url: string;
};

export type SubscriptionView = {
	id: string;
	provider: PaymentProviderName;
	planCode: string;
	billingInterval: string;
	status: string;
	currentPeriodEnd: string | null;
	cancelAtPeriodEnd: boolean;
} | null;

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
		},
	) => apiClient.post<CheckoutResult>("/billing/checkout", input, { accessToken }),
	createPortal: (
		accessToken: string,
		input?: { provider?: PaymentProviderName; returnUrl?: string },
	) => apiClient.post<PortalResult>("/billing/portal", input ?? {}, { accessToken }),
};
