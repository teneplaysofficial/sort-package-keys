# sort-package-keys

> `package.json` sorting utility

A tiny, dependency-free library for consistent `package.json` key ordering.

## Installation

```bash
npm install sort-package-keys
# or
pnpm add sort-package-keys
```

## Usage

```js
const { sortPackageKeys } = require('sort-package-keys');

const pkg = {
  version: '1.0.0',
  name: 'demo',
  scripts: {},
};

const sorted = sortPackageKeys(pkg);

console.log(sorted);
```

Output:

```js
{
  name: 'demo',
  version: '1.0.0',
  scripts: {}
}
```

## Why `sort-package-keys`?

Consistency in `package.json` improves:

- Code review clarity
- Git diffs
- Monorepo maintenance
- Tooling integration
- Formatting automation
