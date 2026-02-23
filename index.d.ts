/**
 * Preferred default `package.json` key order.
 */
declare const PACKAGE_KEY_ORDER: readonly string[];

/**
 * Sort root-level keys of a package.json object.
 *
 * @returns A new sorted object
 */
declare function sortPackageKeys<T extends Record<string, unknown>>(
  /**
   * The `package.json` object to sort.
   *
   * This is not mutated, a new sorted object is returned.
   */
  packageJson: T,
  /**
   * Optional custom key order to use instead of the default `PACKAGE_KEY_ORDER`.
   */
  customOrder?: readonly string[],
): T;

/**
 * Alias of sortPackageKeys.
 */
declare const sortPackageJson: typeof sortPackageKeys;

export { PACKAGE_KEY_ORDER, sortPackageKeys, sortPackageJson };
export default sortPackageKeys;
