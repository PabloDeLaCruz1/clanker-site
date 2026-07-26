"use client";

import { FormEvent, useMemo, useState } from "react";

type Urgency = "low" | "medium" | "high";

type FormState = {
  fullName: string;
  email: string;
  industry: string;
  currentWorkflow: string;
  biggestBottleneck: string;
  desiredOutcome: string;
  companyName: string;
  teamSize: string;
  phone: string;
  urgency: Urgency;
  consent: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

type IntakeResult = {
  payload: {
    submittedAt: string;
    source: string;
    contact: { name: string; email: string; phone: string };
    company: { name: string; industry: string; size: string };
    request: {
      currentWorkflow: string;
      biggestBottleneck: string;
      desiredOutcome: string;
      urgency: Urgency;
    };
    consent: boolean;
  };
  problem: string;
  outcome: string;
  firstStep: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  industry: "",
  currentWorkflow: "",
  biggestBottleneck: "",
  desiredOutcome: "",
  companyName: "",
  teamSize: "",
  phone: "",
  urgency: "medium",
  consent: false,
};

function clean(v: string) {
  return v.replace(/<[^>]*>/g, "").trim();
}

function suggestFirstStep(industry: string) {
  const map: Record<string, string> = {
    Legal: "Automate client intake summary + matter checklist generation.",
    Healthcare: "Automate patient intake summary + follow-up task routing.",
    Finance: "Automate lead qualification summary + risk-note prep.",
    Consulting: "Automate discovery intake + proposal brief draft.",
  };
  return map[industry] ?? "Automate intake normalization + first action checklist.";
}

export default function Home() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<IntakeResult | null>(null);

  const impact = useMemo(() => {
    if (!result) return null;
    const urgency = form.urgency;
    if (urgency === "high") return "Estimated impact: 4–8 hours saved per week.";
    if (urgency === "medium") return "Estimated impact: 2–5 hours saved per week.";
    return "Estimated impact: 1–3 hours saved per week.";
  }, [result, form.urgency]);

  function validate(state: FormState): Errors {
    const e: Errors = {};
    if (clean(state.fullName).length < 2) e.fullName = "Name must be at least 2 characters.";
    if (!/^\S+@\S+\.\S+$/.test(clean(state.email))) e.email = "Enter a valid email.";
    if (!state.industry) e.industry = "Select an industry.";
    if (clean(state.currentWorkflow).length < 20) e.currentWorkflow = "Describe current workflow (min 20 chars).";
    if (clean(state.biggestBottleneck).length < 10) e.biggestBottleneck = "Describe bottleneck (min 10 chars).";
    if (clean(state.desiredOutcome).length < 10) e.desiredOutcome = "Describe desired outcome (min 10 chars).";
    if (!state.consent) e.consent = "Consent required for follow-up.";
    return e;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));

    const payload = {
      submittedAt: new Date().toISOString(),
      source: "client-intake-form-v0",
      contact: {
        name: clean(form.fullName),
        email: clean(form.email),
        phone: clean(form.phone),
      },
      company: {
        name: clean(form.companyName),
        industry: form.industry,
        size: form.teamSize,
      },
      request: {
        currentWorkflow: clean(form.currentWorkflow),
        biggestBottleneck: clean(form.biggestBottleneck),
        desiredOutcome: clean(form.desiredOutcome),
        urgency: form.urgency,
      },
      consent: form.consent,
    };

    setResult({
      payload,
      problem: clean(form.biggestBottleneck),
      outcome: clean(form.desiredOutcome),
      firstStep: suggestFirstStep(form.industry),
    });
    setSubmitting(false);
  }

  const input =
    "mt-1 w-full rounded-lg border border-black/15 bg-white p-2.5 text-sm text-black outline-none focus:border-black/40";

  return (
    <main
      className="mx-auto max-w-5xl px-6 py-10"
      data-deployment-marker="intake-revival-2026-07-26"
    >
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-black/55">
        Prototype · local-only processing
      </p>
      <h1 className="text-3xl font-bold">Workflow Client Intake (v0)</h1>
      <p className="mt-2 text-black/70">
        Capture → Decide → Execute demo form with validation and normalized output. Nothing entered
        here is transmitted or stored.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-black/10 p-5">
          <div>
            <label className="text-sm font-medium">Full Name *</label>
            <input className={input} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Work Email *</label>
            <input className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Industry *</label>
            <select className={input} value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}>
              <option value="">Select</option>
              {[
                "Legal",
                "Healthcare",
                "Finance",
                "Real Estate",
                "E-commerce",
                "Consulting",
                "Other",
              ].map((x) => (
                <option key={x} value={x}>{x}</option>
              ))}
            </select>
            {errors.industry && <p className="mt-1 text-xs text-red-600">{errors.industry}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Current Workflow *</label>
            <textarea className={input} rows={3} value={form.currentWorkflow} onChange={(e) => setForm({ ...form, currentWorkflow: e.target.value })} />
            {errors.currentWorkflow && <p className="mt-1 text-xs text-red-600">{errors.currentWorkflow}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Biggest Bottleneck *</label>
            <textarea className={input} rows={2} value={form.biggestBottleneck} onChange={(e) => setForm({ ...form, biggestBottleneck: e.target.value })} />
            {errors.biggestBottleneck && <p className="mt-1 text-xs text-red-600">{errors.biggestBottleneck}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Desired Outcome *</label>
            <textarea className={input} rows={2} value={form.desiredOutcome} onChange={(e) => setForm({ ...form, desiredOutcome: e.target.value })} />
            {errors.desiredOutcome && <p className="mt-1 text-xs text-red-600">{errors.desiredOutcome}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <input className={input} value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Team Size</label>
              <select className={input} value={form.teamSize} onChange={(e) => setForm({ ...form, teamSize: e.target.value })}>
                <option value="">Select</option>
                {["1", "2-10", "11-50", "51-200", "200+"].map((x) => <option key={x}>{x}</option>)}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Phone</label>
              <input className={input} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div>
              <label className="text-sm font-medium">Urgency</label>
              <select className={input} value={form.urgency} onChange={(e) => setForm({ ...form, urgency: e.target.value as Urgency })}>
                {(["low", "medium", "high"] as Urgency[]).map((x) => <option key={x} value={x}>{x}</option>)}
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} />
            I consent to follow-up communication.
          </label>
          {errors.consent && <p className="-mt-2 text-xs text-red-600">{errors.consent}</p>}

          <button disabled={submitting} className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60">
            {submitting ? "Submitting..." : "Submit Intake"}
          </button>
        </form>

        <section className="space-y-4 rounded-xl border border-black/10 p-5">
          <h2 className="text-xl font-semibold">Demo Output</h2>
          {!result ? (
            <p className="text-black/60">Submit the form to see normalized JSON + action summary.</p>
          ) : (
            <>
              <div className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">Intake received ✅</div>
              <div className="rounded-lg bg-black/[0.03] p-3 text-sm">
                <p><strong>Problem:</strong> {result.problem}</p>
                <p className="mt-1"><strong>Target outcome:</strong> {result.outcome}</p>
                <p className="mt-1"><strong>Suggested first step:</strong> {result.firstStep}</p>
                <p className="mt-2 font-medium">{impact}</p>
              </div>
              <pre className="max-h-[420px] overflow-auto rounded-lg bg-black p-3 text-xs text-green-300">
                {JSON.stringify(result.payload, null, 2)}
              </pre>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
