# DevOps

## Deploy

- GitHub `main` -> Vercel auto-deploy for the root app
- The two prototype apps are separate Vercel projects with their own root-directory settings
- Manual production deploys are available via `vercel --prod` after linking the intended project
- See `DEPLOYMENT_RUNBOOK.md` for the project inventory, reconnection steps, and smoke checks

## Runtime

- Mostly static/SSR pages
- Lightweight API routes for live feed widgets

## Observability

- Vercel Analytics
- Vercel Speed Insights
- Build logs in Vercel dashboard

## Maintenance

- Update `content/build-log.md` for every shipped change
- Update `content/now.md` when direction/progress shifts
- Run `npm run verify:production` after every root deployment
- Run `npm run verify:prototypes` after either prototype is deployed
