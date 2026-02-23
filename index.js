// @ts-check
'use strict';

const PACKAGE_KEY_ORDER = Object.freeze([
  'name',
  'displayName',
  'version',
  'description',
  'keywords',
  'homepage',
  'repository',
  'bugs',
  'funding',
  'license',
  'licenses',
  'author',
  'contributors',
  'maintainers',
  'private',
  'publishConfig',
  'preferGlobal',
  'packageManager',
  'files',
  'man',
  'directories',
  'dist',
  'readme',
  'type',
  'bin',
  'main',
  'module',
  'browser',
  'exports',
  'imports',
  'unpkg',
  'jsdelivr',
  'esnext',
  'sideEffects',
  'types',
  'typings',
  'typesVersions',
  'engines',
  'engineStrict',
  'devEngines',
  'os',
  'cpu',
  'workspaces',
  'scripts',
  'config',
  'dependencies',
  'optionalDependencies',
  'peerDependencies',
  'peerDependenciesMeta',
  'devDependencies',
  'bundleDependencies',
  'bundledDependencies',
  'overrides',
  'resolutions',
  'volta',
  'eslintConfig',
  'prettier',
  'stylelint',
  'lint-staged',
  'ava',
  'jest',
  'release',
  'release-it',
  'release-hub',
  'jscpd',
  'husky',
  'commitlint',
  'lintConfig',
  'babel',
  'browserslist',
  'nyc',
  'ts-node',
  'pnpm',
  'yarn',
  'bun',
  'stackblitz',
  'jspm',
]);

/**
 * @template {Record<string, unknown>} T
 * @param {T} packageJson
 * @param {readonly string[]} [customOrder]
 * @returns {T}
 */
function sortPackageKeys(packageJson, customOrder) {
  if (!packageJson || typeof packageJson !== 'object' || Array.isArray(packageJson)) {
    throw new TypeError('Expected an object as packageJson');
  }

  const order = new Map(
    [...new Set(customOrder ?? PACKAGE_KEY_ORDER)].map((key, index) => [key, index]),
  );
  const keys = Object.keys(packageJson);
  const entries = [];

  keys.sort((a, b) => {
    const aIndex = order.get(a);
    const bIndex = order.get(b);
    const aKnown = aIndex !== undefined;
    const bKnown = bIndex !== undefined;

    if (aKnown && bKnown) {
      return aIndex - bIndex;
    }

    if (aKnown) return -1;
    if (bKnown) return 1;

    return a.localeCompare(b, undefined, { sensitivity: 'base' });
  });

  for (const key of keys) {
    entries.push([key, packageJson[key]]);
  }

  return Object.fromEntries(entries);
}

const sortPackageJson = sortPackageKeys;

module.exports = {
  PACKAGE_KEY_ORDER,
  sortPackageKeys,
  sortPackageJson,
};

module.exports.default = sortPackageKeys;
