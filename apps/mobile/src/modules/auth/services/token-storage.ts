import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const REFRESH_TOKEN_KEY = "schoolos.auth.refreshToken";
const DEVELOPMENT_CODE_KEY = "schoolos.auth.developmentCode";

async function setItem(key: string, value: string | null): Promise<void> {
	if (Platform.OS === "web") {
		if (value === null) {
			globalThis.localStorage?.removeItem(key);
		} else {
			globalThis.localStorage?.setItem(key, value);
		}
		return;
	}
	if (value === null) {
		await SecureStore.deleteItemAsync(key);
		return;
	}
	await SecureStore.setItemAsync(key, value);
}

async function getItem(key: string): Promise<string | null> {
	if (Platform.OS === "web") {
		return globalThis.localStorage?.getItem(key) ?? null;
	}
	return SecureStore.getItemAsync(key);
}

export const tokenStorage = {
	getRefreshToken: () => getItem(REFRESH_TOKEN_KEY),
	setRefreshToken: (token: string | null) => setItem(REFRESH_TOKEN_KEY, token),
	getDevelopmentCode: () => getItem(DEVELOPMENT_CODE_KEY),
	setDevelopmentCode: (code: string | null) => setItem(DEVELOPMENT_CODE_KEY, code),
};
