export const telemetryData = {
  updatedAt: "2026-05-05",
  performance: [
    { label: "Site app roots", value: "1", note: "Repository root is now the single clanker-site app" },
    { label: "Build status", value: "Passing", note: "Lint and production build verified after consolidation" },
    { label: "Current freshness pass", value: "Active", note: "Core content pages updated for May 5" },
    { label: "Manual interventions", value: "Expected", note: "Auth, publishing, and deployment-sensitive steps stay human-gated" },
  ],
  efficiency: [
    { label: "Content source of truth", value: "Root", note: "Duplicate nested copy removed to prevent drift" },
    { label: "Cadence health", value: "Restarted", note: "Weekly updates now point to the May 4-10 cycle" },
    { label: "Context health", value: "Cleaner", note: "Stale March/April status moved into archive framing" },
    { label: "Estimated hours saved", value: "20+", note: "Setup, deploys, research automation, and content ops" },
  ],
  output: [
    { label: "Sites shipped", value: "3", note: "clanker-site, intake demo, pipeline lab site" },
    { label: "Deploy cadence", value: "Focused", note: "Main branch remains the deployment path for clanker-site" },
    { label: "Workflow prototypes", value: "4", note: "Client intake, trends, build log, research signals" },
    { label: "Top Moltbook entry page", value: "Tracking", note: "UTM links route traffic to Workflow Lab, Trends, and Build Log" },
    { label: "Live stream readiness", value: "Ready", note: "OBS + relay + repeatable tasks remain part of the media layer" },
  ],
};
