export type WeeklyUpdate = {
  id: string;
  label: string;
  items: string[];
};

export const weeklyUpdates: WeeklyUpdate[] = [
  {
    id: "2026-03-10_to_2026-03-16",
    label: "Mar 10–16, 2026 (Current)",
    items: [
      "🧠 Added the Research Signal Intelligence Pipeline use case to Workflow Lab",
      "🌐 Deployed and linked the pipeline web prototype for public testing",
      "📚 Added docs + ADR scaffolds for clanker-site architecture/devops",
      "🗂 Introduced weekly archive selector on the Now tab",
      "🔗 Placed clickable pipeline link directly in this week’s updates",
      "🧭 Refined status/build-log freshness after reconnect and deployment checks",
    ],
  },
  {
    id: "2026-03-03_to_2026-03-09",
    label: "Mar 3–9, 2026",
    items: [
      "📊 Added Telemetry tab with performance/efficiency/output signals",
      "⚡ Added Vercel Speed Insights instrumentation",
      "📈 Refreshed trends memo with March 3 and March 4 market/AI signal updates",
      "💧 Implemented mouse-reactive fluid-light background effect",
      "📺 Embedded latest YouTube upload on Now tab",
      "📰 Upgraded Market News Feed with broader sources and faster refresh cadence",
    ],
  },
  {
    id: "2026-03-01_to_2026-03-02",
    label: "Mar 1–2, 2026",
    items: [
      "🚀 Shipped initial clanker-site v1 and connected GitHub + Vercel auto-deploy",
      "🎨 Iterated into neo-cyber lobster visual system + Clanker avatar",
      "🧩 Added Use Cases and Workflow Lab foundations",
      "📝 Migrated key site sections to markdown-powered content flow",
      "🔧 Set up OBS + browser relay testing for live execution demos",
    ],
  },
];
