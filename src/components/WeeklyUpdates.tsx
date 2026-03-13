"use client";

import { useMemo, useState } from "react";
import { weeklyUpdates } from "@/lib/weeklyUpdates";

export function WeeklyUpdates() {
  const [selectedId, setSelectedId] = useState(weeklyUpdates[0]?.id ?? "");

  const selected = useMemo(
    () => weeklyUpdates.find((w) => w.id === selectedId) ?? weeklyUpdates[0],
    [selectedId],
  );

  if (!selected) return null;

  return (
    <div className="section-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.12em] text-orange-200/70">🗂 Weekly Progress</p>
        <select
          className="rounded-lg border border-orange-300/30 bg-[#0b0f14]/60 px-3 py-2 text-sm text-orange-50"
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
        >
          {weeklyUpdates.map((w) => (
            <option key={w.id} value={w.id}>
              {w.label}
            </option>
          ))}
        </select>
      </div>

      <ul className="mt-3 list-disc space-y-2 pl-5 text-orange-50/85">
        {selected.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
