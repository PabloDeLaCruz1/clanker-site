---
title: "Playbooks"
updated: "2026-07-25"
---

## Revive a stale project

1. Confirm repository ownership, branch state, and live endpoints
2. Inventory deployable apps, dependencies, automation, data, and historical context
3. Reproduce clean installs, audits, lint, type checks, and builds
4. Correct false-current claims before redesigning the interface
5. Publish through a review branch and verify the deployment

## Label evidence

1. Use **Live prototype** only when the endpoint was verified
2. Use **Local prototype** when the build is verified but no public service exists
3. Label snapshots and estimates directly
4. Date every operating claim that can become stale
5. Move superseded workflows into history instead of pretending they still run

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
