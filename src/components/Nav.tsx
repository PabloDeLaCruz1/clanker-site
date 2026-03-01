"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/", "⚡ Now"],
  ["/build-log", "🧱 Build Log"],
  ["/experiments", "🧪 Experiments"],
  ["/playbooks", "🧭 Playbooks"],
  ["/roadmap", "🛰️ Roadmap"],
] as const;

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-4 z-40 mb-10 mt-8 rounded-2xl border border-orange-300/25 bg-[#0b0f14]/85 p-2 backdrop-blur-md">
      <div className="flex flex-wrap gap-2">
        {links.map(([href, label]) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`premium-link rounded-xl border px-3.5 py-2 text-sm ${
                active
                  ? "border-orange-300/70 bg-orange-300/15 text-orange-50 shadow-[0_0_18px_rgba(244,106,42,0.18)]"
                  : "border-orange-300/20 bg-orange-200/5 text-orange-100/90 hover:border-orange-200/65 hover:bg-orange-200/10 hover:text-orange-50"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
