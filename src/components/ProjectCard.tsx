import Link from "next/link";
import type { Project } from "@/lib/projects";

const statusClass: Record<Project["status"], string> = {
  Live: "status-live",
  Reviving: "status-reviving",
  "Live prototype": "status-live",
  "Historical prototype": "status-local",
};

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`status-pill ${statusClass[project.status]}`}>{project.status}</p>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-orange-50">{project.title}</h3>
        </div>
        <span aria-hidden="true" className="project-arrow">
          {project.external ? "↗" : "→"}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-orange-50/72">{project.description}</p>
      <p className="mt-5 border-l border-orange-300/30 pl-3 text-xs leading-5 text-orange-100/62">
        {project.evidence}
      </p>
      <ul aria-label={`${project.title} technologies`} className="mt-5 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li className="tech-pill" key={item}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );

  const className = "project-card premium-link";

  if (project.external) {
    return (
      <a className={className} href={project.href} rel="noopener noreferrer" target="_blank">
        {content}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link className={className} href={project.href}>
      {content}
    </Link>
  );
}
