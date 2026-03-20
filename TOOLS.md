# TOOLS.md - Local Notes

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.

## OpenClaw Telegram Recovery Playbook

If the Telegram bot repeats responses or stops responding:

1. Check sessions/context pressure:
   - `openclaw sessions --all-agents`
   - If Telegram session is near context limit (e.g., >90%), reset it.

2. Backup session store before edits:
   - `cp ~/.openclaw/agents/main/sessions/sessions.json ~/.openclaw/agents/main/sessions/sessions.json.bak`

3. Hard reset Telegram session entries only (keep `agent:main:main`):
   - Remove keys from `~/.openclaw/agents/main/sessions/sessions.json`:
     - `agent:main:telegram:direct:6405143536`
     - `telegram:slash:6405143536`

4. Restart gateway cleanly:
   - `pkill -f openclaw-gateway`
   - `openclaw gateway install`
   - `openclaw gateway start`
   - `openclaw status --deep`

5. Validate channel + outbound:
   - `openclaw channels logs --channel telegram --lines 120`
   - Send a test DM to bot: `ping reset 1`

6. Live debug if still broken:
   - `openclaw logs --follow`

Notes:
- Avoid running multiple profiles simultaneously (e.g., `--profile debug` + default) while testing Telegram.
- `openclaw sessions cleanup` does maintenance only; it does not always remove specific stuck sessions.
