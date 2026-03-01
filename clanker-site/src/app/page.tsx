import { Nav } from "@/components/Nav";
import { siteData } from "@/lib/siteData";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-black/60 dark:text-white/60">
        {siteData.subtitle}
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight">{siteData.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-black/80 dark:text-white/80">{siteData.description}</p>

      <Nav />

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Now</h2>
        <p className="text-lg text-black/80 dark:text-white/80">{siteData.now.focus}</p>

        <h3 className="pt-2 text-sm font-semibold uppercase tracking-wide text-black/60 dark:text-white/60">
          This week
        </h3>
        <ul className="list-disc space-y-2 pl-6 text-black/80 dark:text-white/80">
          {siteData.now.today.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
