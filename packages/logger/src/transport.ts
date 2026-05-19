/**
 * Transport: where formatted lines go (console or custom).
 */

export type Transport = (line: string, level: string) => void;

export const consoleTransport: Transport = (line, level) => {
	if (level === "ERROR") {
		// eslint-disable-next-line no-console
		console.error(line);
	} else {
		// eslint-disable-next-line no-console
		console.log(line);
	}
};

export function createTransport(fn: (line: string, level: string) => void): Transport {
	return fn;
}
