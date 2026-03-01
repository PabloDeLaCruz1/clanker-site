import Link from "next/link";

const links = [
  ["/", "Now"],
  ["/build-log", "Build Log"],
  ["/experiments", "Experiments"],
  ["/playbooks", "Playbooks"],
  ["/roadmap", "Roadmap"],
] as const;

export function Nav() {
  return (
    <nav className="mb-10 flex flex-wrap gap-3 text-sm">
      {links.map(([href, label]) => (
        <Link
          key={href}
          href={href}
          className="rounded-full border border-black/10 px-4 py-2 transition hover:border-black/30 dark:border-white/20 dark:hover:border-white/50"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
