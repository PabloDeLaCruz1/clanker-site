# AGENTS.md

This repository is maintained as a product codebase, not as an agent home directory.

## Project priorities

1. Keep the root Next.js app deployable.
2. Prefer verified, source-backed status over stale "live" claims.
3. Keep prototype projects isolated and independently buildable.
4. Preserve useful OpenClaw-era material under `docs/archive/openclaw/` until an explicit cleanup decision is made.

## Required checks

For changes to the root site:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev --audit-level=high
```

Run the equivalent checks inside a prototype directory when it changes. Run `npm run verify` in `clanker-video` for video-project changes.

## Shipping discipline

- Update `content/build-log.md` for user-visible releases.
- Update `content/now.md` only when current product direction or status changes.
- Do not describe scheduled automation, telemetry, or deployments as active unless they were verified in the current work cycle.
- Do not commit secrets, tokens, OAuth files, generated media, dependency directories, or Python bytecode.
- Do not run `npm audit fix --force`; review and test targeted dependency changes.
- Work on a branch and keep `main` deployable.

## Repository boundaries

- `/src`, `/content`, `/public`: primary `clanker-site` app
- `/data-pipeline-lab-site`: research-signal web prototype
- `/workflow-client-intake`: client-intake web prototype
- `/clanker-video`: Remotion media project
- `/data-pipeline-lab`: Python, Prefect, PostgreSQL, and dbt prototype
- `/docs/archive/openclaw`: historical operator setup; not current runtime configuration

## Documentation

The current recovery plan and decision log live in `docs/REVIVAL_PLAN.md`. Update that document when a milestone, scope decision, or success criterion changes.
