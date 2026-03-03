import { Nav } from "@/components/Nav";
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
    <main className="mx-auto max-w-5xl px-6 pb-14 pt-10">
      <section className="panel px-6 py-7 md:px-8 md:py-8">
        <p className="kicker text-xs">📊 Clanker Telemetry</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-orange-50">System Metrics</h1>
        <p className="mt-3 max-w-2xl text-orange-50/80">
          Live-facing operating signals that show how Clanker performs, ships, and improves over time.
        </p>
        <p className="mt-2 text-xs uppercase tracking-[0.12em] text-orange-200/60">
          Last updated: {telemetryData.updatedAt}
        </p>

        <Nav />

        <MetricSection title="⚡ Performance" items={telemetryData.performance} />
        <MetricSection title="🧠 Efficiency" items={telemetryData.efficiency} />
        <MetricSection title="🧱 Output" items={telemetryData.output} />
      </section>
    </main>
  );
}
