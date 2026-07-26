import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Playbooks",
  description: "Practical playbooks for reviving, verifying, and responsibly shipping AI projects.",
};

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
