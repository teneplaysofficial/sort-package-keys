'use strict';

const assert = require('node:assert/strict');
const it = require('node:test');
const { sortPackageKeys, PACKAGE_KEY_ORDER } = require('./index.js');

it('sorts known keys according to default PACKAGE_KEY_ORDER', () => {
  const input = {
    version: '1.0.0',
    name: 'test',
    scripts: { build: 'node build.js' },
    description: 'demo',
  };

  const sorted = sortPackageKeys(input);

  assert.deepStrictEqual(Object.keys(sorted), ['name', 'version', 'description', 'scripts']);
});

it('unknown keys are sorted alphabetically after known keys', () => {
  const input = {
    zebra: true,
    version: '1.0.0',
    alpha: true,
    name: 'pkg',
  };

  const sorted = sortPackageKeys(input);

  assert.deepStrictEqual(Object.keys(sorted), ['name', 'version', 'alpha', 'zebra']);
});

it('custom order overrides default order', () => {
  const input = {
    c: 1,
    b: 2,
    a: 3,
  };

  const sorted = sortPackageKeys(input, ['b', 'a']);

  assert.deepStrictEqual(Object.keys(sorted), ['b', 'a', 'c']);
});

it('duplicate keys in customOrder are ignored via Set', () => {
  const input = {
    name: 'demo',
    version: '1.0.0',
  };

  const sorted = sortPackageKeys(input, ['version', 'version', 'name']);

  assert.deepStrictEqual(Object.keys(sorted), ['version', 'name']);
});

it('preserves original values', () => {
  const input = {
    name: 'my-lib',
    version: '2.0.0',
    scripts: { test: 'node test.js' },
  };

  const sorted = sortPackageKeys(input);

  assert.equal(sorted.name, 'my-lib');
  assert.equal(sorted.version, '2.0.0');
  assert.deepStrictEqual(sorted.scripts, { test: 'node test.js' });
});

it('throws when input is not an object', () => {
  assert.throws(() => sortPackageKeys(null), TypeError);
  assert.throws(() => sortPackageKeys(123), TypeError);
  assert.throws(() => sortPackageKeys([]), TypeError);
});

it('works when packageJson contains keys not in default order', () => {
  const input = {
    foo: 1,
    bar: 2,
  };

  const sorted = sortPackageKeys(input);

  assert.deepStrictEqual(Object.keys(sorted), ['bar', 'foo']);
});

it('PACKAGE_KEY_ORDER is frozen', () => {
  assert.equal(Object.isFrozen(PACKAGE_KEY_ORDER), true);
});
