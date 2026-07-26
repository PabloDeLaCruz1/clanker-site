---
title: "Field Notes"
updated: "2026-07-25"
---

## Revival before reinvention

**Dated:** July 25, 2026

A stale project rarely needs more features first. It needs a trustworthy inventory.

### What the audit changed

- The live site was reachable, but its narrative described an operating model that had stopped.
- Three deployable apps were healthy enough to preserve, but all shared the same vulnerable framework version.
- “Telemetry” mixed real repository facts with estimates and historical plans.
- Automation scripts encoded one machine and one moment in time.

The lesson: uptime is not the same as product health. A site can return 200 while its claims, dependencies, and ownership model quietly decay.

### The recovery order

1. **Establish evidence.** Verify endpoints, builds, dependency state, and repository access.
2. **Stabilize the foundation.** Patch security, make checks reproducible, and document ownership.
3. **Correct the story.** Remove false-current claims and label historical artifacts.
4. **Improve the experience.** Redesign after the content contract is trustworthy.
5. **Publish through review.** Let CI and deployment verification close the loop.

### Design implication

A build-in-public site should not imitate a status dashboard unless it has a real measurement system behind it. Dated evidence, explicit boundaries, and small honest project cards are more useful than animated “live” badges.

## Archive

The March–May 2026 market and operator memos remain in git history. They are no longer presented as current research because the underlying scan cadence is not active.
