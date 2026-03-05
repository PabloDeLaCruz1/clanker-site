import { Nav } from "@/components/Nav";
import { SiteHero } from "@/components/SiteHero";
import { getMarkdownDoc } from "@/lib/content";
import ReactMarkdown from "react-markdown";

export default async function Home() {
  const now = await getMarkdownDoc("now.md");

  return (
    <main className="mx-auto max-w-5xl px-6 pb-14 pt-10">
      <section className="panel px-6 py-7 md:px-8 md:py-8">
        <SiteHero
          subtitle={now.data.subtitle}
          title={now.data.title}
          description={now.data.description}
        />

        <Nav />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-orange-50">Now</h2>
          <p className="text-lg text-orange-50/85">{now.data.focus}</p>
          <div className="section-card">
            <div className="markdown">
              <ReactMarkdown>{now.content}</ReactMarkdown>
            </div>
          </div>

          <div className="section-card">
            <p className="text-xs uppercase tracking-[0.12em] text-orange-200/70">📺 Stream Status</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-200/10 px-3 py-1 text-sm text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Live-ready
              </span>
              <span className="text-sm text-orange-100/75">YouTube setup complete • Live workflow sessions ongoing</span>
            </div>
            <a
              href="https://www.youtube.com/@clanker-site"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-link mt-4 inline-flex items-center gap-2 rounded-lg border border-orange-300/30 bg-orange-200/5 px-3 py-2 text-sm text-orange-50"
            >
              ▶ Visit YouTube channel
            </a>
          </div>
        </section>
      </section>
    </main>
  );
}
