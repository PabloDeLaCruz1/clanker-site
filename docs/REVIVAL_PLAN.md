# Clanker Site Revival Plan

Status: revival complete
Owner: Pablo + Codex
Started: 2026-07-25

## Outcome

Turn the stale OpenClaw-era repository into a secure, maintainable, deployable product workspace with one clear public story and evidence-backed operating status.

## Baseline

The 2026-07-25 audit established:

- The root Next.js app is the primary public site.
- The root site and both prototype sites return HTTP 200 from their Vercel URLs.
- All three Next.js apps lint and build.
- All three Remotion compositions bundle.
- The Python sources compile.
- GitHub has no open issues, pull requests, or Actions workflows.
- The three Next.js apps were pinned to a vulnerable Next.js release.
- Four independent JavaScript projects and lockfiles create maintenance overhead.
- Prototype builds inferred the wrong Turbopack root.
- Public content still presents OpenClaw, Moltbook, Telegram, and May 2026 work as current.
- OpenClaw automation scripts contain machine-specific absolute paths and are not portable.
- The repository mixes public product code with historical agent identity, memory, and operator notes.
- npm's remaining high-severity findings are development-only ESLint transitive dependencies. Production audits are clean; npm currently offers no non-breaking remediation.

## Working product direction

Keep the Clanker name and the proof-driven build-journal idea, but reposition the site as Pablo's AI engineering lab: shipped prototypes, architecture decisions, measurable results, and honest build notes.

OpenClaw should become historical implementation context, not a current capability claim. This direction is a working recommendation until Pablo confirms the final positioning.

## Success criteria

- `main` is protected by reproducible CI checks.
- Production dependencies have no known high or critical npm advisories.
- The root app is the unambiguous product and deploy target.
- Every public "current" claim is dated and verified.
- Legacy operator material is archived or removed from the active project surface.
- The homepage explains who the site is for, what Pablo builds, and where to start.
- Key routes have useful metadata, accessible navigation, and mobile/desktop QA.
- The production deployment is verified after each milestone.

## Current state

All four revival milestones are complete. PRs #1–3 merged through `472c684`; each post-merge run passed all five CI jobs; and the primary Vercel deployments were verified. The Research Signal Lab and Workflow Client Intake projects were then deployed from the reviewed source to their original production URLs. Their page, API, and deployment markers passed the repository-wide production verifier. The repository owner protected `main` with required pull requests, one independent approval, all five up-to-date CI jobs, resolved conversations, and force-push/deletion protection.

## Milestones

### 1. Stabilize the foundation

Status: complete locally and in CI

- Patch vulnerable framework dependencies.
- Add type-check scripts and repository-wide CI.
- Fix ambiguous prototype build roots.
- Replace the OpenClaw agent handbook with project-maintenance instructions.
- Record the audit and recovery roadmap.

Exit: clean installs, production audits, lint, type checks, and production builds pass locally and in GitHub Actions.

### 2. Reframe the product

Status: complete and live on the primary site

- Rewrite the homepage around the AI engineering lab direction.
- Replace stale OpenClaw/Moltbook status with a dated transition note.
- Simplify navigation and define a clear visitor journey.
- Refresh Now, Build Log, Workflow Lab, and project pages from verified evidence.

Exit: no undated or false-current claims remain; the homepage communicates a coherent value proposition.

### 3. Consolidate the workspace

Status: complete for the revival baseline

- Decide whether each prototype is active, archived, or extracted.
- Move legacy identity, memory, Telegram, Moltbook, and machine-specific scripts into a historical archive or remove them.
- Evaluate npm workspaces for shared dependency management.
- Replace the 3 MB checked-in signal cache with a bounded fixture or generated artifact.
- Add focused tests for content loading, API normalization, and critical routes.

Exit: active code has a clear owner and test path; historical material cannot be mistaken for runtime configuration.

### 4. Relaunch and operate

Status: complete

- Complete responsive, accessibility, metadata, and social-card QA.
- Verify Vercel project ownership, environment, analytics, and deployment settings.
- Publish the revival build log.
- Deploy through the reviewed branch and verify the production routes.

Exit: the refreshed site is live, monitored, and documented.

## Decision log

- 2026-07-25: Preserve existing live deployments during the foundation pass.
- 2026-07-25: Treat the repository root as the app of record.
- 2026-07-25: Archive OpenClaw operating instructions under a non-operative filename instead of deleting history.
- 2026-07-25: Use tested PostCSS and Sharp overrides to clear production advisories; do not use npm's unsafe force-fix downgrade.
- 2026-07-25: Recommend an AI engineering lab positioning; final copy remains a product decision.
- 2026-07-26: Archive the OpenClaw identity, memory, Moltbook, Telegram-era automation, and uploader material under `docs/archive/openclaw/legacy/`.
- 2026-07-26: Keep the prototype apps independently installable instead of introducing npm workspaces during the revival baseline.
- 2026-07-26: Replace the 3 MB raw-paper research cache with a 14 KB aggregate snapshot and label the demo historical.
- 2026-07-26: Add focused tests for content metadata, project records, and RSS normalization.
- 2026-07-26: Merge PR #1 as `e895315`; verify five successful CI jobs and the primary Vercel production deployment.
- 2026-07-26: Record the research and intake Vercel projects as separate deployment follow-ups rather than implying they updated with the root app.
- 2026-07-26: Merge PR #2 as `d36ffdb`; verify five post-merge CI jobs, the Vercel production deployment, and corrected public status copy.
- 2026-07-26: Add deterministic deployment markers, production smoke checks, and an exact Vercel reconnection/retirement runbook for the two independently hosted prototypes.
- 2026-07-26: Merge PR #3 as `472c684`; pass all five post-merge CI jobs and deploy the primary site with supported Node 24 GitHub Action runtimes.
- 2026-07-26: Authenticate the owning Vercel account, link both existing prototype projects, deploy the reviewed source, and verify all production freshness checks.
- 2026-07-26: Authenticate the repository owner and protect `main` with an approval gate, all five CI checks, strict branch freshness, resolved conversations, and destructive-update protection.
- 2026-07-26: Replace the preserved March research fixture with a 6,754-paper bounded refresh; anchor comparisons to complete source days and add explicit refresh/source freshness limits.
