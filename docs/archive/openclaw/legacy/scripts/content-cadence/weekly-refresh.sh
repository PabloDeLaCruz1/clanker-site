#!/usr/bin/env bash
set -euo pipefail

# Weekly content refresh scaffold
# 1) Refresh trends + workflow-lab + build-log hygiene
# 2) Lint
# 3) Commit only if changed

ROOT="/Users/a123/.openclaw/workspace"
SITE="$ROOT/clanker-site"

cd "$SITE"

# TODO: add deterministic update logic for weekly tabs

npm run lint

cd "$ROOT"
if ! git diff --quiet -- clanker-site/content/trends.md clanker-site/content/workflow-lab.md clanker-site/content/build-log.md; then
  git add clanker-site/content/trends.md clanker-site/content/workflow-lab.md clanker-site/content/build-log.md
  git commit -m "Weekly content cadence refresh (trends + workflow-lab + build-log)"
  echo "Committed weekly refresh."
else
  echo "No weekly changes detected."
fi
