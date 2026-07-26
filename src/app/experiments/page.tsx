import type { Metadata } from "next";
import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export const metadata: Metadata = {
  title: "Experiments",
  description: "Active, retained, and stopped product hypotheses from the Clanker engineering lab.",
};

export default async function ExperimentsPage() {
  const doc = await getMarkdownDoc("experiments.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Experiments"}
      subtitle="Live bets we're running right now, with clear outcomes over time."
      emoji="🧪"
      content={doc.content}
    />
  );
}
