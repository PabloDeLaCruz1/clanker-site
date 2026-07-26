# clanker-site

The public home for Pablo's Clanker experiments, engineering prototypes, and build notes.

The project has been revived from its original OpenClaw-era setup. The primary Next.js app now presents a current, evidence-backed AI engineering lab; the old operator identity, memory, and automation files are preserved only as history. See [`docs/REVIVAL_PLAN.md`](docs/REVIVAL_PLAN.md) for the audited baseline and milestone plan.

## Live site

- https://clanker-site.vercel.app

## Current status

- Primary app: repository root
- Production: https://clanker-site.vercel.app
- Revival branch: `codex/revive-clanker-site`
- Required checks: lint, TypeScript, production build
- CI: GitHub Actions

The revival branch contains the new product narrative, security upgrades, CI, focused tests, and the historical archive. Production remains unchanged until the reviewed branch is intentionally merged and deployed.

## Workspace

- `src/`, `content/`, `public/` — primary `clanker-site` app
- `data-pipeline-lab-site/` — research-signal web prototype
- `workflow-client-intake/` — client-intake web prototype
- `clanker-video/` — Remotion media project
- `data-pipeline-lab/` — Python, PostgreSQL, Prefect, and dbt prototype
- `docs/archive/openclaw/` — historical operator setup

## What the primary app is

`clanker-site` is the public layer for Pablo's work:

- what is being built now
- shipped prototypes and their evidence
- architecture decisions and implementation notes
- dated field notes
- honest project-health snapshots

The site is intentionally lightweight and fast to update.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vercel hosting (auto-deploy from `main`)

## Local development

```bash
npm ci
npm run dev
```

Open http://localhost:3000

Use Node.js 20.9 or newer.

## Verification

```bash
npm run check
npm audit --omit=dev --audit-level=high
```

Prototype apps have the same `lint`, `typecheck`, `build`, and `check` scripts. The Remotion project uses `npm run verify`.

The patched lockfiles currently pass production audits. npm still reports development-only advisories through ESLint's glob-matching dependency tree; npm has no non-breaking remediation path, so those are tracked rather than force-downgraded.

## Content model

Primary content files:

- `content/now.md`
- `content/build-log.md`
- `content/workflow-lab.md`
- `content/use-cases.md`
- `content/trends.md`

## Key routes

- `/` → current focus, evidence, and selected projects
- `/projects`
- `/build-log`
- `/workflow-lab`
- `/use-cases`
- `/trends`
- `/telemetry`

## Deployment workflow

1. Work on a branch.
2. Run the relevant local checks.
3. Open a pull request and wait for CI.
4. Merge to `main`.
5. Verify the Vercel deployment and key routes.

## Shipping discipline

For every shipped change:

- update `content/build-log.md` in the same cycle
- keep entries concise and commit-like
- update `content/now.md` when user-visible direction changes

## Backend rule

Stay frontend-first until backend is truly required for:

- secrets/server-only keys
- scheduled jobs/webhooks
- auth/private state
- heavier orchestration
