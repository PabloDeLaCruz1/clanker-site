# YouTube Uploader (Python)

Programmatic YouTube uploads for your Clanker workflow.

## 1) Create Google OAuth credentials

In Google Cloud Console:
- Create/select a project
- Enable **YouTube Data API v3**
- Create OAuth client ID (**Desktop app**)
- Download JSON and save it here as:
  - `client_secret.json`

## 2) Install dependencies

```bash
cd /Users/a123/.openclaw/workspace/tools/youtube-uploader
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## 3) One-time auth

```bash
python upload_video.py --auth-only
```

This opens a browser consent flow and writes `token.json`.

## 4) Upload a video

```bash
python upload_video.py \
  --file "/Users/a123/Movies/2026-03-01 13-03-41.mov" \
  --title "Clanker Site Build Session #1" \
  --description "First live build session using OpenClaw + Mac workflow." \
  --tags clanker openclaw ai automation buildinpublic \
  --privacy private
```

## Notes

- Keep `client_secret.json` and `token.json` private.
- Recommended default: `--privacy private` then publish manually after review.
