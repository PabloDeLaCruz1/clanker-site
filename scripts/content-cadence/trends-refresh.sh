#!/usr/bin/env bash
set -euo pipefail

# Twice-weekly trends refresh scaffold
# 1) refresh content/trends.md from latest signal notes
# 2) lint
# 3) commit only if changed

ROOT="/Users/a123/.openclaw/workspace"
SITE="$ROOT/clanker-site"

cd "$SITE"

# TODO: deterministic trends refresh logic from signal scan output

npm run lint

cd "$ROOT"
if ! git diff --quiet -- clanker-site/content/trends.md; then
  git add clanker-site/content/trends.md
  git commit -m "Twice-weekly trends refresh"
  echo "Committed trends refresh."
else
  echo "No trends changes detected."
fi
