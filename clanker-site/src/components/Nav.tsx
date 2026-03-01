"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLink = {
  href: string;
  label: string;
  external?: boolean;
  isYouTube?: boolean;
};

const links: NavLink[] = [
  { href: "/", label: "⚡ Now" },
  { href: "/build-log", label: "🧱 Build Log" },
  { href: "/use-cases", label: "🧩 Use Cases" },
  {
    href: "https://www.youtube.com/channel/UCk7Zu8JfJLEhn4_2EYT7tMg",
    label: "YouTube",
    external: true,
    isYouTube: true,
  },
];

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none">
      <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0033" />
      <path d="M10 9L16 12L10 15V9Z" fill="white" />
    </svg>
  );
}

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-4 z-40 mb-10 mt-8 rounded-2xl border border-orange-300/25 bg-[#0b0f14]/85 p-2 backdrop-blur-md">
      <div className="flex flex-wrap gap-2">
        {links.map(({ href, label, external, isYouTube }) => {
          const active = !external && pathname === href;
          return (
            <Link
              key={href}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className={`premium-link inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm ${
                active
                  ? "border-orange-300/70 bg-orange-300/15 text-orange-50 shadow-[0_0_18px_rgba(244,106,42,0.18)]"
                  : "border-orange-300/20 bg-orange-200/5 text-orange-100/90 hover:border-orange-200/65 hover:bg-orange-200/10 hover:text-orange-50"
              }`}
            >
              {isYouTube ? <YouTubeIcon /> : null}
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
