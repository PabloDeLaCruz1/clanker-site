# clanker-site

Public project journal for **clanker.site**.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Vercel hosting

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Editing content

Primary content source:

- `content/now.md`
- `content/build-log.md`
- `content/experiments.md`
- `content/playbooks.md`
- `content/roadmap.md`

Key pages:

- `/` → `src/app/page.tsx` (Now)
- `/build-log` → `src/app/build-log/page.tsx`
- `/experiments` → `src/app/experiments/page.tsx`
- `/playbooks` → `src/app/playbooks/page.tsx`
- `/roadmap` → `src/app/roadmap/page.tsx`

## Deployment workflow

This repo is connected to Vercel.

- Push to `main` → automatic production deploy
- Pull requests → preview deploys (when used)

Standard loop:

1. Edit
2. Commit
3. Push
4. Verify deploy in Vercel

## Backend rule

Stay frontend-first until a backend is required for:

- secrets/server-only keys
- scheduled jobs/webhooks
- auth/private state
- heavier orchestration

Then introduce a Python backend intentionally.
