import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export default async function WorkflowLabPage() {
  const doc = await getMarkdownDoc("workflow-lab.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Workflow Lab"}
      subtitle="Practical agent workflows we prototype, test, and ship live."
      emoji="🧪"
      content={doc.content}
    />
  );
}
