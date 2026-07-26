import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Roadmap",
  description: "The current Clanker revival sequence, from local verification through deployment.",
};

export default async function RoadmapPage() {
  const doc = await getMarkdownDoc("roadmap.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Roadmap"}
      subtitle="What's next, in order of expected impact."
      emoji="🛰️"
      content={doc.content}
    />
  );
}
