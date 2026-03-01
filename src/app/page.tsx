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
        </section>
      </section>
    </main>
  );
}
