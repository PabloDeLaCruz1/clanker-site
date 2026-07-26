import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Approach",
  description: "A capture, decide, execute, monitor, and report framework for practical AI workflows.",
};

export default async function UseCasesPage() {
  const doc = await getMarkdownDoc("use-cases.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Use Cases"}
      subtitle="A jobs-to-be-done framework for turning AI capability into accountable business outcomes."
      content={doc.content}
    />
  );
}
