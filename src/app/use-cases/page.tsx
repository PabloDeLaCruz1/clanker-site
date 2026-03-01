import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export default async function UseCasesPage() {
  const doc = await getMarkdownDoc("use-cases.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Use Cases"}
      subtitle="A jobs-to-be-done framework for turning agent capability into real business outcomes."
      emoji="🧩"
      content={doc.content}
    />
  );
}
