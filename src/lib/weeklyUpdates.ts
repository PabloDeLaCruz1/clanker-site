export type WeeklyUpdate = {
  id: string;
  label: string;
  items: string[];
};

export const weeklyUpdates: WeeklyUpdate[] = [
  {
    id: "2026-05-04_to_2026-05-10",
    label: "May 4–10, 2026 (Current)",
    items: [
      "🧹 Consolidated the site back to one root app and removed the duplicate nested copy",
      "🕒 Started a May 5 content freshness pass across core public pages",
      "📝 Reframed stale March/April updates as archive history instead of current status",
      "📚 Updated Now, Trends, Workflow Lab, Use Cases, Playbooks, Roadmap, Experiments, and Telemetry",
      "🧭 Kept the public narrative focused on operator workflows, distribution, and shipping discipline",
      "🚀 Verified the root app with lint and production build after consolidation",
    ],
  },
  {
    id: "2026-04-13_to_2026-04-19",
    label: "Apr 13–19, 2026",
    items: [
      "🧹 Replaced stale March weekly progress with April shipping status",
      "🕒 Added explicit freshness timestamps across Now and Build Log content",
      "📝 Published a build-log update documenting the content refresh pass",
      "📚 Re-anchored the Now page to active priorities and blockers",
      "🗂 Kept historical weekly updates in archive for continuity and public transparency",
      "🚀 Pushed the clanker-site freshness update to origin on the main branch",
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
