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
    <nav className="mb-10 mt-8 flex flex-wrap gap-3 text-sm">
      {links.map(([href, label]) => (
        <Link
          key={href}
          href={href}
          className="rounded-full border border-orange-300/30 bg-orange-200/5 px-4 py-2 text-orange-100/90 transition hover:border-orange-200/70 hover:bg-orange-200/10 hover:text-orange-50"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
