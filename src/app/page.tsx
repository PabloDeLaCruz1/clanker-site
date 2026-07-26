import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ProjectCard } from "@/components/ProjectCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHero } from "@/components/SiteHero";
import { WeeklyUpdates } from "@/components/WeeklyUpdates";
import { getMarkdownDoc } from "@/lib/content";
import { projects } from "@/lib/projects";
import ReactMarkdown from "react-markdown";

export default async function Home() {
  const now = await getMarkdownDoc("now.md");

  return (
    <main className="mx-auto max-w-5xl px-5 pb-14 pt-6 md:px-6 md:pt-10" id="main-content">
      <section className="panel px-5 py-6 md:px-8 md:py-8">
        <SiteHero
          subtitle={now.data.subtitle}
          title={now.data.title}
          description={now.data.description}
          status={now.data.status}
          updated={now.data.updated}
        />

        <div className="action-row mt-7">
          <Link className="action-primary" href="/projects">
            Explore the projects
          </Link>
          <Link className="action-secondary" href="/build-log">
            Read the build log
          </Link>
        </div>

        <Nav />

        <section aria-labelledby="proof-heading">
          <div className="section-intro">
            <div>
              <p className="kicker text-xs">Evidence, July 26</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-orange-50" id="proof-heading">
                The revival baseline
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-orange-100/60">
              Measured from clean installs and live endpoint checks—not inherited status copy.
            </p>
          </div>
          <div className="proof-grid mt-5">
            <article className="proof-card">
              <p className="text-3xl font-semibold text-orange-50">3/3</p>
              <p className="mt-2 text-sm text-orange-100/65">Next.js apps lint, type-check, and build</p>
            </article>
            <article className="proof-card">
              <p className="text-3xl font-semibold text-orange-50">0</p>
              <p className="mt-2 text-sm text-orange-100/65">Known production dependency advisories</p>
            </article>
            <article className="proof-card">
              <p className="text-3xl font-semibold text-orange-50">3</p>
              <p className="mt-2 text-sm text-orange-100/65">Public app endpoints verified reachable</p>
            </article>
            <article className="proof-card">
              <p className="text-3xl font-semibold text-orange-50">3</p>
              <p className="mt-2 text-sm text-orange-100/65">Remotion compositions verified from a clean install</p>
            </article>
          </div>
        </section>

        <section className="mt-12" aria-labelledby="featured-heading">
          <div className="section-intro">
            <div>
              <p className="kicker text-xs">Selected work</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-orange-50" id="featured-heading">
                Systems with receipts
              </h2>
            </div>
            <Link className="text-sm text-orange-200/75 hover:text-orange-100" href="/projects">
              View all projects →
            </Link>
          </div>
          <div className="project-grid mt-5">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]" aria-labelledby="current-heading">
          <div className="section-card">
            <p className="kicker text-xs">Current focus</p>
            <h2 className="mt-2 text-2xl font-semibold text-orange-50" id="current-heading">
              {now.data.focus}
            </h2>
            <div className="markdown">
              <ReactMarkdown>{now.content}</ReactMarkdown>
            </div>
          </div>

          <div className="section-card">
            <p className="kicker text-xs">Build media</p>
            <h2 className="mt-2 text-xl font-semibold text-orange-50">The video archive is part of the record.</h2>
            <p className="mt-3 text-sm leading-6 text-orange-50/70">
              Prior walkthroughs remain available on YouTube. New media will resume after the product foundation
              and public narrative are stable.
            </p>
            <a
              href="https://www.youtube.com/@clanker-site"
              target="_blank"
              rel="noopener noreferrer"
              className="action-secondary mt-5"
            >
              Browse the archive ↗
            </a>
          </div>
        </section>

        <section className="mt-4">
          <WeeklyUpdates />
        </section>

        <SiteFooter />
      </section>
    </main>
  );
}
