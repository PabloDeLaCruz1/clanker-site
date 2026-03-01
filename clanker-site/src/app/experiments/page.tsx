import { MarkdownPage } from "@/components/MarkdownPage";
import { getMarkdownDoc } from "@/lib/content";

export default async function ExperimentsPage() {
  const doc = await getMarkdownDoc("experiments.md");

  return (
    <MarkdownPage
      title={doc.data.title ?? "Experiments"}
      subtitle="Live bets we're running right now, with clear outcomes over time."
      content={doc.content}
    />
  );
}
