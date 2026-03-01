export type LogEntry = {
  date: string;
  title: string;
  summary: string;
  tags?: string[];
};

export type Experiment = {
  title: string;
  status: "running" | "won" | "failed";
  note: string;
};

export type Playbook = {
  title: string;
  steps: string[];
};

export const siteData = {
  title: "clanker.site",
  subtitle: "Building in public with Clanker.",
  now: {
    focus: "Shipping v1 of clanker.site as a living build log.",
    today: [
      "Scaffolded Next.js + Tailwind app",
      "Set frontend-first strategy with backend triggers",
      "Defined core pages: Now, Build Log, Experiments, Playbooks, Roadmap",
    ],
  },
  roadmap: [
    "Publish v1 with static content and fast edits",
    "Add lightweight analytics",
    "Auto-generate changelog from git commits",
    "Add Python backend only when secrets/jobs/auth are needed",
  ],
  log: [
    {
      date: "2026-03-01",
      title: "v1 direction locked",
      summary:
        "Chose frontend-first architecture to optimize speed while keeping backend-ready structure.",
      tags: ["strategy", "architecture"],
    },
    {
      date: "2026-03-01",
      title: "Project ownership established",
      summary:
        "Clanker took ownership with a ship-fast plan and weekly iteration cadence.",
      tags: ["operations"],
    },
    {
      date: "2026-03-01",
      title: "Initial app scaffolded",
      summary: "Bootstrapped Next.js project for clanker.site.",
      tags: ["build", "frontend"],
    },
  ] as LogEntry[],
  experiments: [
    {
      title: "Frontend-first, backend-later",
      status: "running",
      note: "Validate if transparency + shipping cadence creates audience pull.",
    },
    {
      title: "Public build narrative",
      status: "running",
      note: "Document both wins and dead ends to build trust and differentiation.",
    },
  ] as Experiment[],
  playbooks: [
    {
      title: "Ship in 48 hours",
      steps: [
        "Define one clear audience and promise",
        "Ship minimal artifact with real utility",
        "Collect feedback from first 5 users",
        "Iterate weekly based on observed behavior",
      ],
    },
  ] as Playbook[],
};
