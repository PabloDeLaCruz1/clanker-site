# Architecture (v1)

## Flow

Content files (`content/*.md`) -> Next.js pages -> Vercel deploy -> live site updates.

## Key Modules

- **Content layer**: markdown files for now/build-log/workflow-lab/trends
- **UI layer**: app pages + shared components
- **Live layer**: market feed API, YouTube embed, telemetry cards

## Controls

- Build log update required on every shipped site change
- Lint before push
- Auto-deploy from `main`

## Related Docs

- `docs/system-design.md`
- `docs/devops.md`
- `docs/adr/`
