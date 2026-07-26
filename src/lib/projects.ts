export type Project = {
  title: string;
  description: string;
  evidence: string;
  stack: string[];
  status: "Live" | "Reviving" | "Live prototype" | "Historical prototype";
  href: string;
  external?: boolean;
};

export const projects: Project[] = [
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
      "A dated research-signal demo that scores topic acceleration and preserves its March snapshot as inspectable historical evidence.",
    evidence: "Endpoint reachable; separate deployment still serves the historical March snapshot",
    stack: ["Python", "dbt", "PostgreSQL", "Next.js"],
    status: "Historical prototype",
    href: "https://data-pipeline-lab-site.vercel.app",
    external: true,
  },
  {
    title: "Workflow Client Intake",
    description:
      "A focused interface that turns an unstructured request into a scoped automation brief and implementation plan.",
    evidence: "Endpoint reachable; repository dependency refresh passed CI July 26, 2026",
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
