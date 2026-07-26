---
title: "Projects & Prototypes"
updated: "2026-07-25"
---

The deeper project record: what each system does, what is verified, and what remains unfinished.

## Clanker Site `Live`

**Purpose**
- Make Pablo's AI, data, and developer-tool work inspectable in one place.

**Verified**
- The public endpoint returns HTTP 200.
- Merge commit `472c684` passed tests, lint, TypeScript, production build, and the production dependency audit in CI.
- Vercel completed the production deployment, and the refreshed homepage, project index, and build log were verified live.
- The repository has one app of record and a documented revival plan.

**Next**
- Operate the site from verified evidence and keep prototype deployment status explicit.

**Stack**
- Next.js, TypeScript, Tailwind CSS, Vercel

---

## Workflow Client Intake `Live prototype`

**Purpose**
- Turn a loosely described business process into a structured automation brief.

**Verified**
- The public prototype endpoint returns HTTP 200.
- The app passes lint, TypeScript, production build, and a production dependency audit.
- The reviewed July build is live, and its deterministic deployment marker passed the production verifier.

**Boundary**
- It demonstrates the intake interaction; it is not presented as a production CRM or persistent client system.
- Form processing remains local to the browser; the demo does not transmit or persist submissions.

**Demo**
- [Open Workflow Client Intake](https://workflow-client-intake.vercel.app)

---

## Research Signal Lab `Snapshot prototype`

**Purpose**
- Ingest research-paper metadata, classify topics, and compare recent topic share with a prior window.

**Verified**
- The public prototype endpoint returns HTTP 200.
- The site and API route pass lint, TypeScript, production build, and a production dependency audit.
- The Python ingestion, transformation, and orchestration sources compile.
- The bounded 6,754-paper snapshot was refreshed July 26 with source coverage through July 23.
- Both complete seven-day comparison windows contain source papers, and the page/API freshness checks pass.

**Boundary**
- The public deployment serves a deliberately refreshed aggregate snapshot, not a real-time research feed.
- The production verifier treats the refresh as stale after seven days and source coverage as stale after ten days.

**Demo**
- [Open Research Signal Lab](https://data-pipeline-lab-site.vercel.app)

---

## Clanker Motion Kit `Local prototype`

**Purpose**
- Produce reusable 15-second vertical explainers for projects and technical ideas.

**Verified**
- A clean install bundles the Founder, Markets, and Automation compositions.

**Boundary**
- The kit is maintained locally and is not a public rendering service.

## Historical operator automations `Archived`

OpenClaw, Telegram recovery, Moltbook posting, and machine-specific cadence scripts are retained as implementation history. They are not active services and are not part of the current product contract.
