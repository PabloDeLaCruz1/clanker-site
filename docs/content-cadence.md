# Content Cadence Policy

## Daily (auto-check)

- `clanker-site/content/now.md`
  - refresh `updated:` date
  - refresh current focus + short status bullets if changed
- `clanker-site/src/lib/telemetryData.ts`
  - refresh `updatedAt`
  - refresh lightweight metric values when available
- **Signal scan**
  - run daily AI/market signal scan
  - store concise findings for trends refresh

## Twice Weekly (auto-check)

- `clanker-site/content/trends.md`
  - refresh memo from latest signal scans
  - include concise "what changed" section

## Weekly (auto-check)

- `clanker-site/content/workflow-lab.md`
  - update workflow statuses (Draft / Testing / Production)
  - update links if new prototypes ship
- `clanker-site/content/build-log.md`
  - weekly cleanup pass (remove placeholders / stale wording)

## Event-driven (on every shipped change)

- Update `clanker-site/content/build-log.md` in same cycle.
- Update `clanker-site/content/now.md` if user-visible direction changed.

## Guardrails

- Keep updates concise and commit-like.
- Avoid rewriting narrative sections unless needed.
- If confidence is low, append a draft note instead of overwriting.
- Never publish private links/secrets.
