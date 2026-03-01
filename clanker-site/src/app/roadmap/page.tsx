import { Nav } from "@/components/Nav";
import { siteData } from "@/lib/siteData";

export default function RoadmapPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Roadmap</h1>
      <Nav />
      <ul className="list-disc space-y-2 pl-6 text-black/80 dark:text-white/80">
        {siteData.roadmap.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </main>
  );
}
