import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects & Prototypes",
  description: "Detailed status, evidence, boundaries, and implementation notes for Clanker projects.",
};

export default async function WorkflowLabPage() {
  const doc = await getMarkdownDoc("workflow-lab.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Workflow Lab"}
      subtitle="Detailed status, evidence, boundaries, and implementation notes."
      content={doc.content}
    />
  );
}
