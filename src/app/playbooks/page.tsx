import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export default async function PlaybooksPage() {
  const doc = await getMarkdownDoc("playbooks.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Playbooks"}
      subtitle="Repeatable workflows we use to go from idea to shipped artifact quickly."
      emoji="🧭"
      content={doc.content}
    />
  );
}
