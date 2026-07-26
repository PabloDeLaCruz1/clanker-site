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
- Merge commit `e895315` passed tests, lint, TypeScript, production build, and the production dependency audit in CI.
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

**Boundary**
- It demonstrates the intake interaction; it is not presented as a production CRM or persistent client system.
- Its separate Vercel deployment predates the July dependency refresh; the repository version is verified by CI.

**Demo**
- [Open Workflow Client Intake](https://workflow-client-intake.vercel.app)

---

## Research Signal Lab `Historical prototype`

**Purpose**
- Ingest research-paper metadata, classify topics, and compare recent topic share with a prior window.

**Verified**
- The public prototype endpoint returns HTTP 200.
- The site and API route pass lint, TypeScript, production build, and a production dependency audit.
- The Python ingestion, transformation, and orchestration sources compile.

**Boundary**
- The public deployment still serves the March 2026 snapshot. It is useful as a demo fixture, not as a live research feed.
- The repository contains the compact aggregate fixture and corrected historical labeling; the separate Vercel project still needs redeployment or retirement.

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
