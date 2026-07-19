import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const BILLING_SUCCESS_PATH = "/(modules)/(profile)/billing-success";
const BILLING_CANCEL_PATH = "/(modules)/(profile)/billing-cancel";
const BILLING_PATH = "/(modules)/(profile)/billing";

/** Deep-link targets so Stripe/Razorpay can return into the Expo app. */
export function billingRedirectUrls() {
	return {
		successUrl: Linking.createURL(BILLING_SUCCESS_PATH),
		cancelUrl: Linking.createURL(BILLING_CANCEL_PATH),
		returnUrl: Linking.createURL(BILLING_PATH),
		/** Prefix shared by success + cancel so the auth session closes for either. */
		checkoutRedirectUrl: Linking.createURL("/(modules)/(profile)/billing-"),
	};
}

/**
 * Opens Nest-hosted Stripe/Razorpay checkout in a system auth browser.
 * Closes when the provider redirects to our app scheme (success or cancel).
 */
export async function openHostedCheckout(
	checkoutUrl: string,
): Promise<"success" | "cancel" | "dismiss"> {
	const { cancelUrl, checkoutRedirectUrl } = billingRedirectUrls();
	const result = await WebBrowser.openAuthSessionAsync(checkoutUrl, checkoutRedirectUrl);

	if (result.type === "success") {
		const url = "url" in result && typeof result.url === "string" ? result.url : "";
		if (url.includes("billing-cancel") || url.startsWith(cancelUrl)) return "cancel";
		return "success";
	}
	return "dismiss";
}

export async function openHostedPortal(portalUrl: string): Promise<void> {
	const { returnUrl } = billingRedirectUrls();
	await WebBrowser.openAuthSessionAsync(portalUrl, returnUrl);
}
