export const telemetryData = {
  updatedAt: "2026-03-03",
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
    { label: "Estimated hours saved", value: "10+", note: "Setup/build/deploy/research combined" },
  ],
  output: [
    { label: "Sites shipped", value: "2", note: "clanker-site + intake demo" },
    { label: "Deploys", value: "Many", note: "Auto from GitHub → Vercel" },
    { label: "Workflow prototypes", value: "3", note: "Client intake, trends, build log" },
    { label: "Live stream readiness", value: "Ready", note: "OBS + relay + repeatable tasks" },
  ],
};
