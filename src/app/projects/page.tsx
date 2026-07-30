import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteFooter } from "@/components/SiteFooter";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "FFXI Agent Lab and other verified AI, data, workflow, and media projects by Pablo De La Cruz.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-14 pt-6 md:px-6 md:pt-10" id="main-content">
      <section className="panel px-5 py-6 md:px-8 md:py-8">
        <p className="kicker text-xs">Project index</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-[-0.025em] text-orange-50 md:text-5xl">
          Built to be inspected, not just announced.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-orange-50/72">
          Each project includes its current status and the strongest evidence available. “Prototype” means
          exactly that; historical data and pending work are labeled instead of polished away.
        </p>

        <Nav />

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        <SiteFooter />
      </section>
    </main>
  );
}
