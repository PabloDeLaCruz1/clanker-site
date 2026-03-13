#!/usr/bin/env bash
set -euo pipefail

# Daily content refresh scaffold
# 1) Update now.md + telemetry timestamp
# 2) Lint
# 3) Commit only if changed

ROOT="/Users/a123/.openclaw/workspace"
SITE="$ROOT/clanker-site"

cd "$SITE"

# TODO: add deterministic update logic for now.md + telemetry data

npm run lint

cd "$ROOT"
if ! git diff --quiet -- clanker-site/content/now.md clanker-site/src/lib/telemetryData.ts; then
  git add clanker-site/content/now.md clanker-site/src/lib/telemetryData.ts
  git commit -m "Daily content cadence refresh (now + telemetry)"
  echo "Committed daily refresh."
else
  echo "No daily changes detected."
fi
