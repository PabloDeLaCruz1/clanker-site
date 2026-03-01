import { Nav } from "@/components/Nav";
import { getMarkdownDoc } from "@/lib/content";
import ReactMarkdown from "react-markdown";

export default async function Home() {
  const now = await getMarkdownDoc("now.md");

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-black/60 dark:text-white/60">
        {now.data.subtitle}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{now.data.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-black/80 dark:text-white/80">{now.data.description}</p>

      <Nav />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Now</h2>
        <p className="text-lg text-black/80 dark:text-white/80">{now.data.focus}</p>
        <div className="mt-4 text-black/80 dark:text-white/80">
          <ReactMarkdown>{now.content}</ReactMarkdown>
        </div>
      </section>
    </main>
  );
}
