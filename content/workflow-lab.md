---
title: "Workflow Lab"
updated: "2026-05-05"
---

Live prototypes we are building and testing on stream.

## 🧹 Site Freshness + Source-of-Truth Cleanup `Production`

**Input**
- Repo review findings, stale content pages, duplicate app roots, and deployment assumptions.

**Agent actions**
- Compare root and nested app copies
- Preserve newer content in the root app
- Remove the duplicate nested app
- Re-run lint and production build checks
- Refresh stale public content into a current dated snapshot

**Output**
- One deployable clanker-site app with May 5 content state.

**Time saved (estimate)**
- 1-2 hours of manual repo archaeology and content reconciliation.

---

## 🧩 Client Intake Automation `Production`

**Input**
- Raw messages, forms, notes, and docs from a lead/client.

**Agent actions**
- Normalize incoming data
- Extract key fields
- Generate intake summary + next-step checklist

**Output**
- Structured intake packet ready for action.

**Time saved (estimate)**
- 30–60 minutes per intake cycle.

**Live demo**
- https://workflow-client-intake.vercel.app

---

## 📈 Weekly Trends Memo `Production`

**Input**
- Current project signals, operating lessons, and distribution feedback.

**Agent actions**
- Distill signals
- Add impact context
- Convert to action-oriented memo format

**Output**
- `Signal → Why it matters → What we do` memo format.

**Time saved (estimate)**
- 2–4 hours per week.

---

## 🧠 Research Signal Intelligence Pipeline `Testing`

**Input**
- arXiv paper metadata (title, abstract, categories, publish date)

**Agent actions**
- Apply keyword taxonomy by theme
- Compute daily mention shares
- Score trend acceleration (7d vs prior 7d)

**Output**
- Early-signal trend tables and dashboard-ready metrics for prototype review.

**Time saved (estimate)**
- 3–6 hours per week on trend scouting and synthesis.

**Web prototype**
- https://data-pipeline-lab-site.vercel.app

---

## 🧱 Build Log Autopublisher `Planned`

**Input**
- Recent commits and deployment events.

**Agent actions**
- Summarize meaningful changes
- Convert into human-readable ship notes
- Publish to build log with consistent style

**Output**
- High-signal build log without manual copy work.

**Time saved (estimate)**
- 20–40 minutes per release.

---

More workflows shipping soon.
