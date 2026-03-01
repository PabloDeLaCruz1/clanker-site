import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export default async function UseCasesPage() {
  const doc = await getMarkdownDoc("use-cases.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Use Cases"}
      subtitle="Practical ways people can use Clawbot + OpenClaw agents to move faster."
      emoji="🧩"
      content={doc.content}
    />
  );
}
