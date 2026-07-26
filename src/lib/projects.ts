export type Project = {
  title: string;
  description: string;
  evidence: string;
  stack: string[];
  status: "Reviving" | "Live prototype" | "Historical prototype";
  href: string;
  external?: boolean;
};

export const projects: Project[] = [
  {
    title: "Clanker Site",
    description:
      "A proof-driven engineering journal for shipped AI systems, data products, and the decisions behind them.",
    evidence: "Secure revival baseline verified July 26, 2026",
    stack: ["Next.js", "TypeScript", "Vercel"],
    status: "Reviving",
    href: "/build-log",
  },
  {
    title: "Research Signal Lab",
    description:
      "An end-to-end prototype that ingests research metadata, scores topic acceleration, and serves a reviewable signal dashboard.",
    evidence: "Live endpoint verified; cached research snapshot is historical",
    stack: ["Python", "dbt", "PostgreSQL", "Next.js"],
    status: "Live prototype",
    href: "https://data-pipeline-lab-site.vercel.app",
    external: true,
  },
  {
    title: "Workflow Client Intake",
    description:
      "A focused interface that turns an unstructured request into a scoped automation brief and implementation plan.",
    evidence: "Live prototype endpoint verified July 25, 2026",
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
