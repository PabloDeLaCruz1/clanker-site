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
    <>
      <aside className="fixed left-4 top-4 z-40 hidden w-60 rounded-2xl border border-orange-300/25 bg-[#0b0f14]/90 p-3 backdrop-blur-md lg:block">
        <div className="mb-2 px-2 pb-2 text-xs uppercase tracking-[0.18em] text-orange-200/70">
          Navigation
        </div>
        <nav className="flex flex-col gap-2 text-sm">
          {links.map(([href, label]) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-xl border px-3 py-2 transition ${
                  active
                    ? "border-orange-300/60 bg-orange-300/15 text-orange-50"
                    : "border-orange-300/20 bg-orange-200/5 text-orange-100/90 hover:border-orange-200/65 hover:bg-orange-200/10 hover:text-orange-50"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <nav className="mb-6 flex flex-wrap gap-2 text-sm lg:hidden">
        {links.map(([href, label]) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`rounded-full border px-3 py-1.5 transition ${
                active
                  ? "border-orange-300/60 bg-orange-300/15 text-orange-50"
                  : "border-orange-300/20 bg-orange-200/5 text-orange-100/90"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
