import { Nav } from "@/components/Nav";
import { SiteHero } from "@/components/SiteHero";
import { getMarkdownDoc } from "@/lib/content";
import ReactMarkdown from "react-markdown";

export default async function Home() {
  const now = await getMarkdownDoc("now.md");

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
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
          <div className="rounded-xl border border-orange-300/20 bg-orange-200/[0.04] p-4 md:p-5">
            <div className="markdown">
              <ReactMarkdown>{now.content}</ReactMarkdown>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
