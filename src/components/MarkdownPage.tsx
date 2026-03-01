import { Nav } from "@/components/Nav";
import ReactMarkdown from "react-markdown";

type Props = {
  title: string;
  subtitle?: string;
  content: string;
  emoji?: string;
};

export function MarkdownPage({ title, subtitle, content, emoji }: Props) {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <section className="panel px-6 py-7 md:px-8 md:py-8">
        <h1 className="text-4xl font-semibold tracking-tight text-orange-50">
          {emoji ? `${emoji} ` : ""}
          {title}
        </h1>
        {subtitle ? <p className="mt-3 max-w-2xl text-orange-50/75">{subtitle}</p> : null}
        <Nav />
        <div className="rounded-xl border border-orange-300/20 bg-orange-200/[0.04] p-4 md:p-5">
          <div className="markdown">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
      </section>
    </main>
  );
}
