import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import ReactMarkdown from "react-markdown";

type Props = {
  title: string;
  subtitle?: string;
  content: string;
  emoji?: string;
};

export function MarkdownPage({ title, subtitle, content, emoji }: Props) {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-14 pt-6 md:px-6 md:pt-10" id="main-content">
      <section className="panel px-5 py-6 md:px-8 md:py-8">
        <h1 className="text-4xl font-semibold tracking-tight text-orange-50">
          {emoji ? `${emoji} ` : ""}
          {title}
        </h1>
        <div className="luxury-divider" />
        {subtitle ? <p className="max-w-2xl text-orange-50/75">{subtitle}</p> : null}
        <Nav />
        <div className="section-card">
          <div className="markdown">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </div>
        <SiteFooter />
      </section>
    </main>
  );
}
