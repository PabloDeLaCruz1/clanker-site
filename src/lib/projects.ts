export type Project = {
  title: string;
  description: string;
  evidence: string;
  stack: string[];
  status:
    | "Active"
    | "Live"
    | "Reviving"
    | "Live prototype"
    | "Snapshot prototype"
    | "Historical prototype";
  href: string;
  external?: boolean;
};

export const projects: Project[] = [
  {
    title: "FFXI Agent Lab",
    description:
      "A local-first AI control lab where Codex progresses one character through an isolated FFXI-compatible world behind bounded, auditable tools.",
    evidence: "Public source, active Black Mage 40 goal, and runtime YouTube livestream verified July 31, 2026",
    stack: ["MCP", "TypeScript", "LandSandBoat", "Ashita"],
    status: "Active",
    href: "https://github.com/pablodcruz/ffxi-agents-server",
    external: true,
  },
  {
    title: "Clanker Site",
    description:
      "A proof-driven engineering journal for shipped AI systems, data products, and the decisions behind them.",
    evidence: "Merge, five CI jobs, and production deployment verified July 26, 2026",
    stack: ["Next.js", "TypeScript", "Vercel"],
    status: "Live",
    href: "/build-log",
  },
  {
    title: "Research Signal Lab",
    description:
      "A bounded research-signal demo that scores topic acceleration from a deliberately refreshed arXiv snapshot.",
    evidence: "6,754-paper snapshot refreshed July 26; source coverage verified through July 23",
    stack: ["Python", "dbt", "PostgreSQL", "Next.js"],
    status: "Snapshot prototype",
    href: "https://data-pipeline-lab-site.vercel.app",
    external: true,
  },
  {
    title: "Workflow Client Intake",
    description:
      "A focused interface that turns an unstructured request into a scoped automation brief and implementation plan.",
    evidence: "Reviewed deployment and local-only intake marker verified July 26, 2026",
    stack: ["Next.js", "TypeScript", "Product design"],
    status: "Live prototype",
    href: "https://workflow-client-intake.vercel.app",
    external: true,
  },
  {
    title: "Clanker Motion Kit",
    description:
      "An archived set of vertical-video compositions from the OpenClaw era, retained as a working motion-design reference.",
    evidence: "Three historical compositions still bundle successfully from a clean install",
    stack: ["Remotion", "React", "Motion design"],
    status: "Historical prototype",
    href: "/build-log",
  },
];
