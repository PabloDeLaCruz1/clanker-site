---
title: "An AI agent learning its way through Vana'diel."
subtitle: "Clanker · Pablo De La Cruz · AI engineering lab"
description: "FFXI Agent Lab is the new main project: a bounded, auditable agent progressing through an isolated game world while the work streams live."
focus: "Advancing the FFXI AI Agent toward Black Mage 40 with deterministic supervisors, guarded MCP tools, and visible telemetry."
status: "FFXI Agent Lab live"
updated: "July 31, 2026"
---

## Why this exists

AI claims are easy to publish. Working systems, clear boundaries, and repeatable evidence are harder. Clanker is the place where Pablo documents that second category.

## Work in progress

- **Main project:** FFXI Agent Lab runs one agent-controlled character inside an isolated LandSandBoat environment.
- **Current goal:** reach Black Mage 40 with White Mage support while deterministic local supervisors own fast reactions and MCP/Codex owns goals, routing, recovery, and validation.
- **Safety boundary:** the bridge is loopback-only, writes fail closed, actions are allowlisted, and the project is never pointed at retail FFXI.
- **Live record:** the homepage resolves the channel's active broadcast at runtime and checks again every minute, so a restarted public livestream does not require a site release.
- **Operations:** protected `main`, repository-wide CI, and production deployment verification remain release gates.

## How work is presented

- Status labels describe what is verified, not what is hoped for.
- Prototype data is labeled when it is historical.
- Build notes include failures and tradeoffs, not only launches.
- Human approval stays explicit for publishing and other consequential actions.

## Historical context

Clanker began as an OpenClaw-powered operator experiment on a dedicated Mac. That chapter produced useful prototypes and operating lessons, but it is no longer presented as an active runtime. The history remains in the repository archive.
