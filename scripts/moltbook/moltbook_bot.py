#!/usr/bin/env python3
import json, os, re, sys, datetime, pathlib
from urllib import request, parse

ROOT = pathlib.Path('/Users/a123/.openclaw/workspace')
CREDS = pathlib.Path('/Users/a123/.config/moltbook/credentials.json')
PAUSE = ROOT / 'scripts/moltbook/PAUSE'
QUEUE = ROOT / 'content/moltbook-queue.md'
LOG = ROOT / 'memory/moltbook-log.jsonl'

API = 'https://www.moltbook.com/api/v1'


def now_iso():
    return datetime.datetime.utcnow().isoformat() + 'Z'


def log(event):
    LOG.parent.mkdir(parents=True, exist_ok=True)
    with LOG.open('a') as f:
        f.write(json.dumps({'ts': now_iso(), **event}) + '\n')


def read_api_key():
    d = json.loads(CREDS.read_text())
    return d['api_key'], d.get('agent_name','agent')


def http(method, path, api_key=None, payload=None):
    url = f"{API}{path}"
    data = None
    headers = {'Content-Type': 'application/json'}
    if api_key:
        headers['Authorization'] = f'Bearer {api_key}'
    if payload is not None:
        data = json.dumps(payload).encode()
    req = request.Request(url, method=method, headers=headers, data=data)
    with request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode())


def take_queue_item():
    if not QUEUE.exists():
        return None
    lines = QUEUE.read_text().splitlines()
    out = None
    for i, ln in enumerate(lines):
        m = re.match(r"^- \[ \] (.+?) :: (.+)$", ln)
        if m:
            out = (m.group(1).strip(), m.group(2).strip())
            lines[i] = ln.replace('- [ ]', '- [x]', 1)
            break
    if out:
        QUEUE.write_text('\n'.join(lines) + '\n')
    return out


def daily_post():
    if PAUSE.exists():
        log({'action':'daily_post','status':'paused'})
        return
    api_key, _ = read_api_key()
    item = take_queue_item()
    if not item:
        log({'action':'daily_post','status':'no_queue_item'})
        return
    title, content = item
    res = http('POST', '/posts', api_key, {
        'submolt_name':'general',
        'title': title[:300],
        'content': content[:4000]
    })
    log({'action':'daily_post','status':'posted','title':title,'post_id':res.get('post',{}).get('id')})


def engage():
    if PAUSE.exists():
        log({'action':'engage','status':'paused'})
        return
    api_key, agent_name = read_api_key()
    feed = http('GET', '/posts?sort=hot&limit=15', api_key)
    posts = feed.get('posts', []) if isinstance(feed, dict) else []
    up = 0
    commented = 0
    for p in posts:
        pid = p.get('id')
        author = (p.get('author',{}) or {}).get('name','').lower()
        if not pid or author == agent_name.lower():
            continue
        if up < 4:
            try:
                http('POST', f'/posts/{pid}/upvote', api_key)
                up += 1
            except Exception:
                pass
        if commented < 1:
            msg = "Nice signal. Appreciate the clear write-up."
            try:
                http('POST', f'/posts/{pid}/comments', api_key, {'content': msg})
                commented += 1
            except Exception:
                pass
        if up >= 4 and commented >= 1:
            break
    log({'action':'engage','status':'done','upvotes':up,'comments':commented})


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'engage'
    if cmd == 'daily_post':
        daily_post()
    elif cmd == 'engage':
        engage()
    else:
        print('Usage: moltbook_bot.py [daily_post|engage]')
        sys.exit(1)
