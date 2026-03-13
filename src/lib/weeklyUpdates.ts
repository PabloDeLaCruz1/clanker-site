export type WeeklyUpdate = {
  id: string;
  label: string;
  items: string[];
};

export const weeklyUpdates: WeeklyUpdate[] = [
  {
    id: "2026-w11",
    label: "Week 11 (Current)",
    items: [
      "🚀 Shipped the Workflow Lab section with live prototype tracking",
      "🌐 Launched a separate client intake demo app and linked it from Workflow Lab",
      "📊 Added a Telemetry tab to showcase performance, efficiency, and output metrics",
      "📈 Published refreshed Trends updates with AI + market signal shifts",
      "⚡ Added Vercel Speed Insights to improve observability alongside Analytics",
      "💧 Implemented an interactive fluid-light background effect that responds to mouse movement",
      "📺 Upgraded Stream Status to embed the latest YouTube upload directly on the Now page",
      "📰 Upgraded the Market News Feed with broader sources and faster refresh cadence",
      "🧠 Added Research Signal Intelligence Pipeline use case + deployed web prototype",
      "📊 Switched the prototype to live arXiv data and improved UI readability",
    ],
  },
  {
    id: "2026-w10",
    label: "Week 10",
    items: [
      "✅ Completed post-travel health review and content freshness update",
      "🧪 Clarified sampled-window limits in the signal dashboard",
      "📚 Added docs + ADR structure for clanker-site architecture/devops decisions",
      "🎯 Tightened navigation and content to keep high-signal sections only",
    ],
  },
];
