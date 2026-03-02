import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export default async function TrendsPage() {
  const doc = await getMarkdownDoc("trends.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Trends"}
      subtitle="Signal-first market and AI trend memos focused on execution, not hype."
      emoji="📈"
      content={doc.content}
    />
  );
}
