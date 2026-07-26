import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { SiteFooter } from "@/components/SiteFooter";
import { telemetryData } from "@/lib/telemetryData";

type Metric = { label: string; value: string; note: string };

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <article className="section-card premium-link">
      <p className="text-xs uppercase tracking-[0.12em] text-orange-200/70">{metric.label}</p>
      <p className="mt-2 text-3xl font-semibold text-orange-50">{metric.value}</p>
      <p className="mt-2 text-sm text-orange-100/75">{metric.note}</p>
    </article>
  );
}

function MetricSection({ title, items }: { title: string; items: Metric[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-orange-50">{title}</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((metric) => (
          <MetricCard key={metric.label} metric={metric} />
        ))}
      </div>
    </section>
  );
}

export default function TelemetryPage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-14 pt-6 md:px-6 md:pt-10" id="main-content">
      <section className="panel px-5 py-6 md:px-8 md:py-8">
        <p className="kicker text-xs">Verified evidence</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-orange-50">Project Health</h1>
        <p className="mt-3 max-w-2xl text-orange-50/80">
          A dated snapshot of what was actually checked. This is not a real-time monitoring surface.
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-orange-200/60">
          Last updated: {telemetryData.updatedAt}
        </p>

        <Nav />

        <MetricSection title="Verification" items={telemetryData.performance} />
        <MetricSection title="Repository shape" items={telemetryData.efficiency} />
        <MetricSection title="Delivery status" items={telemetryData.output} />
        <SiteFooter />
      </section>
    </main>
  );
}
export const metadata: Metadata = {
  title: "Project Health",
  description: "Dated, verified repository, build, dependency, and endpoint evidence for Clanker.",
};
