---
title: "Playbooks"
updated: "2026-05-05"
---

## Content freshness pass

1. Search the repo for stale dates, "current" labels, and outdated status claims
2. Update the public status pages first: Now, Weekly Progress, Telemetry, Build Log
3. Refresh editorial pages next: Trends, Workflow Lab, Use Cases, Playbooks, Roadmap, Experiments
4. Run lint and production build before publishing
5. Add a build-log entry so the maintenance work is visible

## Ship in 48 hours

1. Define a single user outcome and success metric
2. Build the smallest useful version end-to-end
3. Ship publicly and collect feedback from first 5 users
4. Iterate once per week based on observed behavior

## When to add a backend

1. Keep frontend-only while data is public and simple
2. Add backend when secrets must stay server-side
3. Add backend when scheduled jobs or webhooks become core
4. Add backend when auth or private per-user state is required

## Avoid content drift

1. Keep one app root and one content directory for each public site
2. Archive old weekly updates instead of overwriting history
3. Avoid hard-coding "current" unless the label is tied to a dated weekly record
4. Treat stale public claims as bugs
