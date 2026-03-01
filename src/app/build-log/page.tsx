import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export default async function BuildLogPage() {
  const doc = await getMarkdownDoc("build-log.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Build Log"}
      subtitle="Timestamped notes on what we shipped, changed, and learned."
      emoji="🧱"
      content={doc.content}
    />
  );
}
