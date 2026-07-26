# Research Signal Lab

A bounded research-snapshot prototype for exploring arXiv keyword acceleration and topic momentum.

The app serves a checked-in aggregate snapshot that can be refreshed deliberately from the arXiv API. It is not a real-time data product. Raw paper abstracts are excluded from the web repository; the bounded fixture contains only summary rows and chart series.

## Local development

```bash
npm ci
npm run dev
```

Open http://localhost:3000.

Use Node.js 20.9 or newer.

## Verification

```bash
npm run check
npm audit --omit=dev --audit-level=high
```

## Refreshing the snapshot

From the repository root, install the Python pipeline requirements and run:

```bash
python data-pipeline-lab/scripts/refresh_signals_cache.py
```

The script fetches a bounded arXiv sample, computes the 7-day comparison and 30-day chart series, and replaces `public/signals-cache.json` without committing raw abstracts.
