import { Nav } from "@/components/Nav";
import ReactMarkdown from "react-markdown";

type Props = {
  title: string;
  subtitle?: string;
  content: string;
};

export function MarkdownPage({ title, subtitle, content }: Props) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section className="panel px-6 py-7 md:px-8 md:py-8">
        <h1 className="text-4xl font-semibold tracking-tight text-cyan-50">{title}</h1>
        {subtitle ? <p className="mt-3 max-w-2xl text-cyan-50/75">{subtitle}</p> : null}
        <Nav />
        <div className="markdown">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </section>
    </main>
  );
}
