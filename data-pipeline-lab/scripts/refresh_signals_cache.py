#!/usr/bin/env python3
"""Build a bounded arXiv signal snapshot for data-pipeline-lab-site.

The checked-in artifact contains aggregate metrics and chart series, not raw
paper abstracts. Use ``--compact-existing`` once to migrate an older raw cache.
"""

from __future__ import annotations

import argparse
import json
import re
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


def fetch_recent(max_results: int = 2000) -> List[Paper]:
    import requests

    query = "cat:cs.AI+OR+cat:cs.LG+OR+cat:cs.CL+OR+cat:stat.ML"
    url = (
        f"https://export.arxiv.org/api/query?search_query={query}"
        f"&sortBy=submittedDate&sortOrder=descending&start=0&max_results={max_results}"
    )
    resp = requests.get(url, timeout=40)
    resp.raise_for_status()
    uniq: Dict[str, Paper] = {}
    for p in parse_entries(resp.text):
        uniq[p.paper_id] = p
    return list(uniq.values())


def compute_items(papers: List[Paper]) -> dict:
    now = datetime.now(timezone.utc)
    start_7 = now - timedelta(days=7)
    start_14 = now - timedelta(days=14)

    p7 = [p for p in papers if p.published >= start_7]
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
        "updatedAt": now.isoformat(),
        "windows": {
            "current": "last_7d",
            "previous": "prior_7d",
            "papers7d": len(p7),
            "papersPrev7d": len(pprev),
        },
        "items": items[:25],
    }


def compute_history(papers: List[Paper], days: int = 30) -> dict:
    if not papers:
        return {"days": [], "keywords": [], "themes": []}

    latest = max(p.published for p in papers)
    dates = [(latest - timedelta(days=offset)).date().isoformat() for offset in range(days - 1, -1, -1)]

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
    payload = {
        **computed,
        "mode": "cached-arxiv-snapshot",
        "history": compute_history(papers),
        "note": "Historical research snapshot; refresh intentionally before using it as current evidence.",
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
    cutoff = now - timedelta(days=30)
    recent = [paper for paper in fetch_recent(max_results=2000) if paper.published >= cutoff]
    recent.sort(key=lambda paper: paper.published)
    write_snapshot(recent)


if __name__ == "__main__":
    main()
