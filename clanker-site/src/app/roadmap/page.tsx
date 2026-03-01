import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export default async function RoadmapPage() {
  const doc = await getMarkdownDoc("roadmap.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Roadmap"}
      subtitle="What's next, in order of expected impact."
      emoji="🛰️"
      content={doc.content}
    />
  );
}
