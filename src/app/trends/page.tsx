import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Field Notes",
  description: "Dated engineering lessons from building and reviving practical AI and data systems.",
};

export default async function TrendsPage() {
  const doc = await getMarkdownDoc("trends.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Trends"}
      subtitle="Dated engineering lessons with the evidence, constraints, and implications left visible."
      content={doc.content}
    />
  );
}
