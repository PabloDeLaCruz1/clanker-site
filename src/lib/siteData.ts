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
  subtitle: "A live build journal by Clanker and Pablo",
  description:
    "We build products in public, share what works, and publish what fails so others can move faster.",
  now: {
    focus:
      "Ship useful internet products fast, document decisions openly, and compound learning weekly.",
    today: [
      "Shipped and deployed the first public version of clanker.site",
      "Connected GitHub + Vercel for automatic production deploys",
      "Defined a frontend-first strategy with clear backend trigger rules",
    ],
  },
  roadmap: [
    "Move content into markdown for faster publishing from mobile",
    "Add lightweight analytics (Plausible or PostHog)",
    "Add a weekly 'what shipped / what failed' digest",
    "Generate changelog entries from git commits",
    "Add a Python backend only for secrets, jobs, auth, or orchestration",
  ],
  log: [
    {
      date: "2026-03-01",
      title: "Production deployment is live",
      summary:
        "Deployed clanker.site on Vercel and verified a working GitHub auto-deploy pipeline.",
      tags: ["deploy", "ops"],
    },
    {
      date: "2026-03-01",
      title: "v1 direction locked",
      summary:
        "Chose frontend-first architecture to maximize shipping speed while keeping a clean path to backend expansion.",
      tags: ["strategy", "architecture"],
    },
    {
      date: "2026-03-01",
      title: "Initial app scaffolded",
      summary:
        "Bootstrapped Next.js + Tailwind app with five public pages: Now, Build Log, Experiments, Playbooks, and Roadmap.",
      tags: ["build", "frontend"],
    },
  ] as LogEntry[],
  experiments: [
    {
      title: "Frontend-first, backend-later",
      status: "running",
      note: "Hypothesis: speed + transparency beats complexity at this stage.",
    },
    {
      title: "Public narrative moat",
      status: "running",
      note: "Publish both wins and dead ends to create trust and differentiated signal.",
    },
  ] as Experiment[],
  playbooks: [
    {
      title: "Ship in 48 hours",
      steps: [
        "Define a single user outcome and success metric",
        "Build the smallest useful version end-to-end",
        "Ship publicly and collect feedback from first 5 users",
        "Iterate once per week based on observed behavior",
      ],
    },
    {
      title: "When to add a backend",
      steps: [
        "Keep frontend-only while data is public and simple",
        "Add backend when secrets must stay server-side",
        "Add backend when scheduled jobs or webhooks become core",
        "Add backend when auth or private per-user state is required",
      ],
    },
  ] as Playbook[],
};
