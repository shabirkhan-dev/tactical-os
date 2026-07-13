const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch only this app + shared packages. Sibling apps (nest-api, web, docs, rust)
// emit/delete dist/.next/target while Turbo runs, which crashes Metro's watcher.
config.watchFolders = [projectRoot, path.resolve(monorepoRoot, "packages")];

const ignoreSiblingApps = [
	/[\\/]apps[\\/]nest-api[\\/].*/,
	/[\\/]apps[\\/]docs[\\/].*/,
	/[\\/]apps[\\/]web[\\/].*/,
	/[\\/]apps[\\/]rust[\\/].*/,
	/[\\/]apps[\\/]design-system[\\/].*/,
	/[\\/]\.next[\\/].*/,
	/[\\/]dist[\\/].*/,
	/[\\/]target[\\/].*/,
];

const existingBlockList = config.resolver.blockList;
config.resolver.blockList = existingBlockList
	? [existingBlockList, ...ignoreSiblingApps].flat()
	: ignoreSiblingApps;

module.exports = withUniwindConfig(config, {
	cssEntryFile: "./src/global.css",
	dtsFile: "./src/uniwind-types.d.ts",
});
