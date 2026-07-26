# Deployment Runbook

This repository has one primary production app and two independently deployed prototypes. A green
root deployment does not prove that either prototype was rebuilt.

## Deployment inventory

| Project | Vercel root directory | Production URL | Source target |
| --- | --- | --- | --- |
| Clanker Site | `.` | https://clanker-site.vercel.app | `main` |
| Research Signal Lab | `data-pipeline-lab-site` | https://data-pipeline-lab-site.vercel.app | `main` |
| Workflow Client Intake | `workflow-client-intake` | https://workflow-client-intake.vercel.app | `main` |

The Clanker Site project deployed merge commit `472c684` successfully on July 26, 2026. The two
prototype projects were linked locally to their existing Vercel projects and deployed manually from
the reviewed `main` source the same day:

- Research Signal Lab: `dpl_61it8VrwCzQ8tdKh7uasoaZygih3`
- Workflow Client Intake: `dpl_6ZVX1xP38DCU9au7TRbUyDqRLi7s`

All production verifier checks passed after correcting the research page assertion to match its
actual stable source marker.

## Link or reconnect a prototype

For a manual CLI deployment, run `vercel link` from the prototype directory and select the existing
project. For Git-based deployment, configure the existing Vercel project:

1. Open **Settings → Git** and connect `PabloDeLaCruz1/clanker-site`.
2. Set the production branch to `main`.
3. Set the root directory to the value in the inventory above.
4. Keep the framework preset on Next.js and use the repository's default install and build commands.
5. Confirm the Node.js version satisfies the package requirement (`>=20.9.0`).
6. Deploy the current `main` commit.
7. From the repository root, run `npm run verify:prototypes`.

Local `.vercel/` links and `.env.local` files are ignored and must never be committed.

The prototype apps do not currently require Vercel environment variables. The research app serves a
checked-in historical aggregate snapshot; it does not fetch arXiv during a page request. The intake
app processes its demonstration form entirely in the browser and does not persist submissions.

## Verification

Run the primary production smoke checks:

```bash
npm run verify:production
```

After reconnecting or deploying both prototypes:

```bash
npm run verify:prototypes
```

To verify every public endpoint:

```bash
npm run verify:deployments
```

The verifier accepts URL overrides for previews:

- `CLANKER_SITE_URL`
- `RESEARCH_SITE_URL`
- `INTAKE_SITE_URL`

The research checks require the `Historical Prototype` page label and the
`cached-arxiv-snapshot` API mode. The intake check requires the revival deployment marker. These
markers distinguish the reviewed source from the older public builds.

## Retiring a prototype

If a prototype should not remain public, remove its external link and current-status claim from
`src/lib/projects.ts` and `content/workflow-lab.md`, then archive or remove its Vercel project through
the owning account. Do not describe a prototype as deployed from the revived source until its
deployment checks pass.
