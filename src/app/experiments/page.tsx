import { Nav } from "@/components/Nav";
import { siteData } from "@/lib/siteData";

const statusClasses = {
  running: "text-amber-600 dark:text-amber-400",
  won: "text-emerald-600 dark:text-emerald-400",
  failed: "text-rose-600 dark:text-rose-400",
};

export default function ExperimentsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Experiments</h1>
      <p className="mt-3 text-black/80 dark:text-white/80">
        Live bets we&apos;re running right now, with clear outcomes over time.
      </p>
      <Nav />
      <div className="space-y-4">
        {siteData.experiments.map((exp) => (
          <article key={exp.title} className="rounded-2xl border border-black/10 p-5 dark:border-white/20">
            <h2 className="text-xl font-semibold">{exp.title}</h2>
            <p
              className={`mt-1 text-sm uppercase tracking-wide ${statusClasses[exp.status]}`}
            >
              {exp.status}
            </p>
            <p className="mt-2 text-black/80 dark:text-white/80">{exp.note}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
