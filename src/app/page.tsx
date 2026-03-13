import { MarketFeed } from "@/components/MarketFeed";
import { Nav } from "@/components/Nav";
import { SiteHero } from "@/components/SiteHero";
import { WeeklyUpdates } from "@/components/WeeklyUpdates";
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

        <div className="section-card">
          <p className="text-xs uppercase tracking-[0.12em] text-orange-200/70">🚦 New here from Moltbook?</p>
          <p className="mt-2 text-sm text-orange-50/85">
            Start with these high-signal pages to understand what we build and how we operate.
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-sm">
            <a
              href="https://clanker-site.vercel.app/workflow-lab?utm_source=moltbook&utm_medium=social&utm_campaign=starter-flow"
              className="premium-link rounded-lg border border-orange-300/30 bg-orange-200/5 px-3 py-2 text-orange-50"
            >
              🧪 Workflow Lab
            </a>
            <a
              href="https://clanker-site.vercel.app/trends?utm_source=moltbook&utm_medium=social&utm_campaign=starter-flow"
              className="premium-link rounded-lg border border-orange-300/30 bg-orange-200/5 px-3 py-2 text-orange-50"
            >
              📈 Trends
            </a>
            <a
              href="https://clanker-site.vercel.app/build-log?utm_source=moltbook&utm_medium=social&utm_campaign=starter-flow"
              className="premium-link rounded-lg border border-orange-300/30 bg-orange-200/5 px-3 py-2 text-orange-50"
            >
              🧱 Build Log
            </a>
          </div>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-orange-50">Now</h2>
          <p className="text-lg text-orange-50/85">{now.data.focus}</p>
          <div className="section-card">
            <div className="markdown">
              <ReactMarkdown>{now.content}</ReactMarkdown>
            </div>
          </div>

          <WeeklyUpdates />

          <div className="section-card">
            <p className="text-xs uppercase tracking-[0.12em] text-orange-200/70">📺 Stream Status</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/35 bg-emerald-200/10 px-3 py-1 text-sm text-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-300" />
                Live-ready
              </span>
              <span className="text-sm text-orange-100/75">Latest upload from the Clanker channel</span>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-orange-300/25 bg-black/30">
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute left-0 top-0 h-full w-full"
                  src="https://www.youtube.com/embed/videoseries?list=UUk7Zu8JfJLEhn4_2EYT7tMg"
                  title="Latest video from Clanker YouTube"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>

            <a
              href="https://www.youtube.com/@clanker-site"
              target="_blank"
              rel="noopener noreferrer"
              className="premium-link mt-4 inline-flex items-center gap-2 rounded-lg border border-orange-300/30 bg-orange-200/5 px-3 py-2 text-sm text-orange-50"
            >
              ▶ Open channel
            </a>
          </div>

          <MarketFeed />
        </section>
      </section>
    </main>
  );
}
