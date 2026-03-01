import Link from "next/link";

const links = [
  ["/", "⚡ Now"],
  ["/build-log", "🧱 Build Log"],
  ["/experiments", "🧪 Experiments"],
  ["/playbooks", "🧭 Playbooks"],
  ["/roadmap", "🛰️ Roadmap"],
] as const;

export function Nav() {
  return (
    <nav className="fixed left-1/2 top-4 z-50 flex w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 flex-wrap gap-2 rounded-2xl border border-orange-300/30 bg-[#0b0f14]/85 p-2 text-sm backdrop-blur-md">
      {links.map(([href, label]) => (
        <Link
          key={href}
          href={href}
          className="rounded-xl border border-orange-300/20 bg-orange-200/5 px-3 py-2 text-orange-100/90 transition hover:border-orange-200/70 hover:bg-orange-200/10 hover:text-orange-50"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
