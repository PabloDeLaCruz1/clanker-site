"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
};

const links: NavLink[] = [
  { href: "/", label: "Overview" },
  { href: "/projects", label: "Projects" },
  { href: "/build-log", label: "Build log" },
  { href: "/trends", label: "Field notes" },
  { href: "/use-cases", label: "Approach" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary navigation"
      className="sticky top-3 z-40 mb-10 mt-8 min-w-0 max-w-full overflow-x-auto rounded-2xl border border-orange-300/20 bg-[#0b0f14]/88 p-2 shadow-[0_12px_40px_rgba(0,0,0,0.24)] backdrop-blur-md"
    >
      <div className="flex min-w-max gap-1.5">
        {links.map(({ href, label, external }) => {
          const active = !external && (pathname === href || (href !== "/" && pathname.startsWith(href)));
          return (
            <Link
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              aria-current={active ? "page" : undefined}
              className={`premium-link inline-flex items-center rounded-xl border px-3.5 py-2 text-sm ${
                active
                  ? "border-orange-300/70 bg-orange-300/15 text-orange-50 shadow-[0_0_18px_rgba(244,106,42,0.18)]"
                  : "border-transparent text-orange-100/70 hover:border-orange-200/30 hover:bg-orange-200/[0.06] hover:text-orange-50"
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
