#!/usr/bin/env python3
import datetime
import json
import pathlib
import re
import sys
from urllib import request

ROOT = pathlib.Path('/Users/a123/.openclaw/workspace')
CREDS = pathlib.Path('/Users/a123/.config/moltbook/credentials.json')
PAUSE = ROOT / 'scripts/moltbook/PAUSE'
QUEUE = ROOT / 'content/moltbook-queue.md'
LOG = ROOT / 'memory/moltbook-log.jsonl'

API = 'https://www.moltbook.com/api/v1'

MAX_POSTS_PER_DAY = 1
MAX_COMMENTS_PER_DAY = 3
MAX_UPVOTES_PER_DAY = 8

BANNED_TITLE_PATTERNS = [r'^title$', r'^test$', r'^post$', r'^hello$']

PROJECT_KEYWORDS = [
    'workflow', 'pipeline', 'signal', 'trends', 'telemetry', 'deploy', 'build log', 'automation', 'clanker'
]

OUTCOME_KEYWORDS = [
    'shipped', 'improved', 'reduced', 'faster', 'saved', 'deployed', 'launched', 'fixed', 'clarified', 'updated'
]


def now_iso():
    return datetime.datetime.utcnow().isoformat() + 'Z'


def today_utc():
    return datetime.datetime.utcnow().strftime('%Y-%m-%d')


def log(event):
    LOG.parent.mkdir(parents=True, exist_ok=True)
    with LOG.open('a') as f:
        f.write(json.dumps({'ts': now_iso(), **event}) + '\n')


def read_log_rows():
    if not LOG.exists():
        return []
    rows = []
    for ln in LOG.read_text().splitlines():
        try:
            rows.append(json.loads(ln))
        except Exception:
            continue
    return rows


def daily_counts():
    day = today_utc()
    rows = [r for r in read_log_rows() if str(r.get('ts', '')).startswith(day)]
    posts = sum(1 for r in rows if r.get('action') == 'daily_post' and r.get('status') == 'posted')
    comments = sum(int(r.get('comments', 0)) for r in rows if r.get('action') == 'engage')
    upvotes = sum(int(r.get('upvotes', 0)) for r in rows if r.get('action') == 'engage')
    return posts, comments, upvotes


def read_api_key():
    d = json.loads(CREDS.read_text())
    return d['api_key'], d.get('agent_name', 'agent')


def http(method, path, api_key=None, payload=None):
    url = f"{API}{path}"
    data = json.dumps(payload).encode() if payload is not None else None
    headers = {'Content-Type': 'application/json'}
    if api_key:
        headers['Authorization'] = f'Bearer {api_key}'
    req = request.Request(url, method=method, headers=headers, data=data)
    with request.urlopen(req, timeout=30) as r:
        body = r.read().decode()
        return json.loads(body) if body else {}


def valid_title(title: str) -> bool:
    t = title.strip()
    if len(t) < 8 or len(t) > 140:
        return False
    for p in BANNED_TITLE_PATTERNS:
        if re.match(p, t, flags=re.IGNORECASE):
            return False
    return True


def sanitize_content(text: str) -> str:
    text = re.sub(r'\s+', ' ', text).strip()
    return text[:3500]


def content_quality_ok(content: str) -> bool:
    c = content.lower()
    has_project = any(k in c for k in PROJECT_KEYWORDS)
    has_outcome = any(k in c for k in OUTCOME_KEYWORDS)
    long_enough = len(c) >= 80
    return has_project and has_outcome and long_enough


def take_queue_item():
    if not QUEUE.exists():
        return None
    lines = QUEUE.read_text().splitlines()
    out = None
    for i, ln in enumerate(lines):
        m = re.match(r"^- \[ \] (.+?) :: (.+)$", ln)
        if not m:
            continue
        title = m.group(1).strip()
        content = sanitize_content(m.group(2).strip())
        if not valid_title(title):
            lines[i] = ln.replace('- [ ]', '- [!]', 1) + '  # skipped: invalid title'
            continue
        if not content_quality_ok(content):
            lines[i] = ln.replace('- [ ]', '- [!]', 1) + '  # skipped: low content quality'
            continue
        out = (title, content)
        lines[i] = ln.replace('- [ ]', '- [x]', 1)
        break
    QUEUE.write_text('\n'.join(lines) + '\n')
    return out


def daily_post():
    if PAUSE.exists():
        log({'action': 'daily_post', 'status': 'paused'})
        return
    posts, comments, upvotes = daily_counts()
    if posts >= MAX_POSTS_PER_DAY:
        log({'action': 'daily_post', 'status': 'daily_cap_reached', 'posts_today': posts})
        return

    api_key, _ = read_api_key()
    item = take_queue_item()
    if not item:
        log({'action': 'daily_post', 'status': 'no_valid_queue_item'})
        return

    title, content = item
    res = http('POST', '/posts', api_key, {'submolt_name': 'general', 'title': title, 'content': content})
    log({'action': 'daily_post', 'status': 'posted', 'title': title, 'post_id': (res.get('post', {}) or {}).get('id')})


def engage():
    if PAUSE.exists():
        log({'action': 'engage', 'status': 'paused'})
        return

    posts, comments_today, upvotes_today = daily_counts()
    remaining_comments = max(0, MAX_COMMENTS_PER_DAY - comments_today)
    remaining_upvotes = max(0, MAX_UPVOTES_PER_DAY - upvotes_today)
    if remaining_comments == 0 and remaining_upvotes == 0:
        log({'action': 'engage', 'status': 'daily_cap_reached', 'comments_today': comments_today, 'upvotes_today': upvotes_today})
        return

    api_key, agent_name = read_api_key()
    feed = http('GET', '/posts?sort=hot&limit=15', api_key)
    posts_feed = feed.get('posts', []) if isinstance(feed, dict) else []

    up = 0
    commented = 0
    for p in posts_feed:
        pid = p.get('id')
        author = (p.get('author', {}) or {}).get('name', '').lower()
        if not pid or author == agent_name.lower():
            continue

        if up < min(4, remaining_upvotes):
            try:
                http('POST', f'/posts/{pid}/upvote', api_key)
                up += 1
            except Exception:
                pass

        if commented < min(1, remaining_comments):
            msg = 'Nice signal. Appreciate the clear write-up.'
            try:
                http('POST', f'/posts/{pid}/comments', api_key, {'content': msg})
                commented += 1
            except Exception:
                pass

        if up >= min(4, remaining_upvotes) and commented >= min(1, remaining_comments):
            break

    log({'action': 'engage', 'status': 'done', 'upvotes': up, 'comments': commented})


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'engage'
    if cmd == 'daily_post':
        daily_post()
    elif cmd == 'engage':
        engage()
    else:
        print('Usage: moltbook_bot.py [daily_post|engage]')
        sys.exit(1)
