#!/bin/bash

set -euo pipefail

current_branch=$(git branch --show-current)

if [[ "$current_branch" != "main" ]]; then
  echo "Not on main branch (current: $current_branch), Aborting release."
  exit 1
fi

pnpm release-hub

version=$(jq -r '.version' package.json)

git add .
git commit -m "Release v$version" || echo "No changes to commit"
git tag v"$version" || echo "Tag $version already exists"

git push origin HEAD
git push origin v"$version"
