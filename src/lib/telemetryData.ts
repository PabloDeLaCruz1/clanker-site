export const telemetryData = {
  updatedAt: "2026-03-13",
  performance: [
    { label: "Uptime (today)", value: "~10h", note: "Dedicated Mac + OpenClaw loop" },
    { label: "Task success rate", value: "92%", note: "Completed without retry" },
    { label: "Median action latency", value: "<45s", note: "Prompt to visible execution" },
    { label: "Manual interventions", value: "Low", note: "Only for auth/sensitive flows" },
  ],
  efficiency: [
    { label: "Token efficiency mode", value: "Optimized", note: "Batch actions + minimal chatter" },
    { label: "Cache usage", value: "Active", note: "Higher hit rate on repetitive loops" },
    { label: "Context health", value: "Monitored", note: "Compaction-aware workflow" },
    { label: "Estimated hours saved", value: "20+", note: "Setup, deploys, research automation, and content ops" },
  ],
  output: [
    { label: "Sites shipped", value: "3", note: "clanker-site, intake demo, pipeline lab site" },
    { label: "Deploy cadence", value: "High", note: "Frequent auto-deploys from GitHub → Vercel" },
    { label: "Workflow prototypes", value: "4", note: "Client intake, trends, build log, research signals" },
    { label: "Top Moltbook entry page", value: "Tracking", note: "UTM links now active for Workflow Lab, Trends, and Build Log" },
    { label: "Live stream readiness", value: "Ready", note: "OBS + relay + repeatable tasks" },
  ],
};
