import { Nav } from "@/components/Nav";
import { getMarkdownDoc } from "@/lib/content";
import ReactMarkdown from "react-markdown";

export default async function Home() {
  const now = await getMarkdownDoc("now.md");

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section className="panel px-6 py-7 md:px-8 md:py-8">
        <p className="kicker text-xs">{now.data.subtitle}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-cyan-50 md:text-5xl">{now.data.title}</h1>
        <p className="mt-4 max-w-2xl text-lg text-cyan-50/80">{now.data.description}</p>

        <Nav />

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-cyan-50">Now</h2>
          <p className="text-lg text-cyan-50/85">{now.data.focus}</p>
          <div className="markdown mt-4">
            <ReactMarkdown>{now.content}</ReactMarkdown>
          </div>
        </section>
      </section>
    </main>
  );
}
