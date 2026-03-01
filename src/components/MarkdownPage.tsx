import { Nav } from "@/components/Nav";
import ReactMarkdown from "react-markdown";

type Props = {
  title: string;
  subtitle?: string;
  content: string;
};

export function MarkdownPage({ title, subtitle, content }: Props) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
      {subtitle ? <p className="mt-3 text-black/80 dark:text-white/80">{subtitle}</p> : null}
      <Nav />
      <div className="space-y-3 text-black/80 dark:text-white/80 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_ol>li]:list-decimal">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </main>
  );
}
