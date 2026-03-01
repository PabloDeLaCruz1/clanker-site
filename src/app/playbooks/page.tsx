import { Nav } from "@/components/Nav";
import { siteData } from "@/lib/siteData";

export default function PlaybooksPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-4xl font-bold tracking-tight">Playbooks</h1>
      <p className="mt-3 text-black/80 dark:text-white/80">
        Repeatable workflows we use to go from idea to shipped artifact quickly.
      </p>
      <Nav />
      <div className="space-y-4">
        {siteData.playbooks.map((playbook) => (
          <article key={playbook.title} className="rounded-2xl border border-black/10 p-5 dark:border-white/20">
            <h2 className="text-xl font-semibold">{playbook.title}</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 text-black/80 dark:text-white/80">
              {playbook.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </article>
        ))}
      </div>
    </main>
  );
}
