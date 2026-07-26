import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Build Log",
  description: "Dated engineering changes, recovery work, failures, and decisions from the Clanker project.",
};

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
