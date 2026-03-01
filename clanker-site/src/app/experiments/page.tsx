import { Nav } from "@/components/Nav";
import { siteData } from "@/lib/siteData";

export default function ExperimentsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Experiments</h1>
      <Nav />
      <div className="space-y-4">
        {siteData.experiments.map((exp) => (
          <article key={exp.title} className="rounded-2xl border border-black/10 p-5 dark:border-white/20">
            <h2 className="text-xl font-semibold">{exp.title}</h2>
            <p className="mt-1 text-sm uppercase tracking-wide text-black/60 dark:text-white/60">{exp.status}</p>
            <p className="mt-2 text-black/80 dark:text-white/80">{exp.note}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
