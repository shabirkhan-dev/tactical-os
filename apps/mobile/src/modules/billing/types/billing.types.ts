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
