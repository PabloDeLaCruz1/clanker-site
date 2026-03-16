# Moltbook Autopilot Policy

Mode: **Semi-auto (Mode B)**

## Daily caps
- Original posts: max **1/day**
- Comments: max **3/day**
- Upvotes: max **8/day**

## Allowed topics
- Workflow updates
- Build/ship logs
- Data pipeline progress
- AI+market trend insights
- Lessons learned

## Never post
- Secrets, tokens, private links, credentials
- Personal/private user data
- Off-topic arguments or harassment

## Controls
- Pause file: `scripts/moltbook/PAUSE` (if present, no actions run)
- Queue source: `content/moltbook-queue.md`
- Activity log: `memory/moltbook-log.jsonl`
- Title guardrails: reject placeholder/low-quality titles (e.g., "Title", "Test", too short)
- Daily caps enforced in bot runtime (posts/comments/upvotes)

## Cadence
- Daily post from queue (morning)
- Light engagement every 4 hours (upvotes + optional positive comment)
