#!/usr/bin/env python3
"""Build a bounded arXiv signal snapshot for data-pipeline-lab-site.

The checked-in artifact contains aggregate metrics and chart series, not raw
paper abstracts. Use ``--compact-existing`` once to migrate an older raw cache.
"""

from __future__ import annotations

import argparse
import json
import re
import time
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Dict, List

ROOT = Path(__file__).resolve().parents[2]
CACHE_PATH = ROOT / "data-pipeline-lab-site" / "public" / "signals-cache.json"

KEYWORDS = [
    ("agent", "agentic_systems"),
    ("multi-agent", "agentic_systems"),
    ("rag", "retrieval_knowledge"),
    ("retrieval", "retrieval_knowledge"),
    ("multimodal", "multimodal"),
    ("vision-language", "multimodal"),
    ("transformer", "foundation_models"),
    ("attention", "foundation_models"),
    ("lora", "efficiency_infra"),
    ("quantization", "efficiency_infra"),
    ("alignment", "safety_governance"),
    ("hallucination", "safety_governance"),
]

FOCUS_KEYWORDS = ["attention", "agent", "rag", "multimodal", "transformer"]

THEME_KEYWORDS = {
    "foundation_models": ["transformer", "attention", "llm", "gpt", "bert"],
    "retrieval_knowledge": ["rag", "retrieval", "embedding"],
    "agentic_systems": ["agent", "multi-agent", "tool use"],
    "multimodal": ["multimodal", "vision-language", "vlm"],
    "efficiency_infra": ["lora", "quantization", "distillation"],
    "safety_governance": ["alignment", "hallucination", "robustness"],
}


@dataclass
class Paper:
    paper_id: str
    published: datetime
    text: str


def parse_entries(xml: str) -> List[Paper]:
    entries = re.findall(r"<entry>[\s\S]*?</entry>", xml)
    out: List[Paper] = []
    for entry in entries:
        pid = re.search(r"<id>http://arxiv.org/abs/(.*?)</id>", entry)
        pub = re.search(r"<published>(.*?)</published>", entry)
        title = re.search(r"<title>([\s\S]*?)</title>", entry)
        summary = re.search(r"<summary>([\s\S]*?)</summary>", entry)
        if not (pid and pub):
            continue
        try:
            published = datetime.fromisoformat(pub.group(1).replace("Z", "+00:00"))
        except ValueError:
            continue
        txt = f"{title.group(1) if title else ''} {summary.group(1) if summary else ''}"
        txt = re.sub(r"\s+", " ", txt).lower().strip()
        out.append(Paper(pid.group(1).strip(), published, txt))
    return out


def fetch_recent(max_results: int = 7500, page_size: int = 2500) -> List[Paper]:
    import requests

    query = "cat:cs.AI+OR+cat:cs.LG+OR+cat:cs.CL+OR+cat:stat.ML"
    uniq: Dict[str, Paper] = {}
    headers = {
        "User-Agent": (
            "clanker-site research snapshot maintainer "
            "(https://github.com/PabloDeLaCruz1/clanker-site)"
        )
    }

    for start in range(0, max_results, page_size):
        requested = min(page_size, max_results - start)
        url = (
            f"https://export.arxiv.org/api/query?search_query={query}"
            f"&sortBy=submittedDate&sortOrder=descending"
            f"&start={start}&max_results={requested}"
        )

        for attempt in range(3):
            try:
                resp = requests.get(url, headers=headers, timeout=120)
                resp.raise_for_status()
                break
            except requests.RequestException:
                if attempt == 2:
                    raise
                time.sleep(5 * (attempt + 1))

        page = parse_entries(resp.text)
        for paper in page:
            uniq[paper.paper_id] = paper

        if len(page) < requested:
            break
        if start + requested < max_results:
            time.sleep(3)

    return list(uniq.values())


def compute_items(papers: List[Paper]) -> dict:
    refreshed_at = datetime.now(timezone.utc)
    if not papers:
        return {
            "mode": "cached-arxiv-snapshot",
            "updatedAt": refreshed_at.isoformat(),
            "sourceThrough": None,
            "coverageStart": None,
            "sampleSize": 0,
            "windows": {
                "current": "latest_7_complete_source_days",
                "previous": "prior_7_source_days",
                "papers7d": 0,
                "papersPrev7d": 0,
            },
            "items": [],
        }

    latest = max(paper.published for paper in papers)
    earliest = min(paper.published for paper in papers)
    window_end = datetime.combine(
        latest.date() + timedelta(days=1),
        datetime.min.time(),
        tzinfo=timezone.utc,
    )
    start_7 = window_end - timedelta(days=7)
    start_14 = window_end - timedelta(days=14)

    p7 = [p for p in papers if start_7 <= p.published < window_end]
    pprev = [p for p in papers if start_14 <= p.published < start_7]

    items = []
    for keyword, theme in KEYWORDS:
        c7 = sum(1 for p in p7 if keyword in p.text)
        cp = sum(1 for p in pprev if keyword in p.text)
        s7 = c7 / len(p7) if p7 else 0
        sp = cp / len(pprev) if pprev else 0
        growth = (c7 - cp) / max(cp, 1)
        score = 0.6 * growth + 0.4 * (s7 - sp)
        if c7 >= 3 or cp >= 3:
            items.append(
                {
                    "keyword": keyword,
                    "theme": theme,
                    "count7d": c7,
                    "countPrev7d": cp,
                    "share7d": s7,
                    "sharePrev7d": sp,
                    "score": score,
                }
            )

    items.sort(key=lambda r: r["score"], reverse=True)
    return {
        "mode": "cached-arxiv-snapshot",
        "updatedAt": refreshed_at.isoformat(),
        "sourceThrough": latest.isoformat(),
        "coverageStart": earliest.isoformat(),
        "sampleSize": len(papers),
        "windows": {
            "current": "latest_7_complete_source_days",
            "previous": "prior_7_source_days",
            "papers7d": len(p7),
            "papersPrev7d": len(pprev),
        },
        "items": items[:25],
    }


def compute_history(papers: List[Paper], days: int = 30) -> dict:
    if not papers:
        return {"days": [], "keywords": [], "themes": []}

    latest = max(p.published for p in papers)
    earliest = min(p.published for p in papers)
    requested_start = latest.date() - timedelta(days=days - 1)
    start = max(requested_start, earliest.date())
    available_days = (latest.date() - start).days + 1
    dates = [(start + timedelta(days=offset)).isoformat() for offset in range(available_days)]

    def series(key: str, label: str, keywords: List[str]) -> dict:
        points = []
        for date in dates:
            value = sum(
                1
                for paper in papers
                if paper.published.date().isoformat() == date
                and any(keyword in paper.text for keyword in keywords)
            )
            points.append({"date": date, "value": value})
        return {"key": key, "label": label, "points": points}

    return {
        "days": dates,
        "keywords": [series(keyword, keyword, [keyword]) for keyword in FOCUS_KEYWORDS],
        "themes": [
            series(theme, theme.replace("_", " "), keywords)
            for theme, keywords in THEME_KEYWORDS.items()
        ],
    }


def write_snapshot(papers: List[Paper], *, preserve_metadata: dict | None = None) -> None:
    computed = preserve_metadata or compute_items(papers)
    source_through = computed.get("sourceThrough")
    source_date = source_through[:10] if source_through else "unavailable"
    payload = {
        **computed,
        "mode": "cached-arxiv-snapshot",
        "history": compute_history(papers),
        "note": (
            "Bounded arXiv snapshot refreshed from recent source records; "
            f"source coverage through {source_date}. This is not a real-time feed."
        ),
    }
    CACHE_PATH.parent.mkdir(parents=True, exist_ok=True)
    CACHE_PATH.write_text(json.dumps(payload, separators=(",", ":")), encoding="utf-8")
    print(f"Updated bounded snapshot: {CACHE_PATH} | source_papers={len(papers)} | items={len(payload['items'])}")


def compact_existing() -> None:
    cache = json.loads(CACHE_PATH.read_text(encoding="utf-8"))
    papers = [
        Paper(
            paper_id=paper["paper_id"],
            published=datetime.fromisoformat(paper["published"]),
            text=paper["text"],
        )
        for paper in cache.get("papers", [])
    ]
    metadata = {key: cache[key] for key in ("updatedAt", "windows", "items") if key in cache}
    write_snapshot(papers, preserve_metadata=metadata)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--compact-existing", action="store_true")
    args = parser.parse_args()

    if args.compact_existing:
        compact_existing()
        return

    now = datetime.now(timezone.utc)
    cutoff_date = (now - timedelta(days=30)).date()
    recent = [
        paper
        for paper in fetch_recent(max_results=7500)
        if paper.published.date() >= cutoff_date
    ]
    recent.sort(key=lambda paper: paper.published)
    write_snapshot(recent)


if __name__ == "__main__":
    main()
