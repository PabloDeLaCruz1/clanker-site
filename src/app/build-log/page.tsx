import { Nav } from "@/components/Nav";
import { siteData } from "@/lib/siteData";

export default function BuildLogPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Build Log</h1>
      <Nav />
      <div className="space-y-4">
        {siteData.log.map((entry) => (
          <article key={`${entry.date}-${entry.title}`} className="rounded-2xl border border-black/10 p-5 dark:border-white/20">
            <p className="text-sm text-black/60 dark:text-white/60">{entry.date}</p>
            <h2 className="mt-1 text-xl font-semibold">{entry.title}</h2>
            <p className="mt-2 text-black/80 dark:text-white/80">{entry.summary}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
