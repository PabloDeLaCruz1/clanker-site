import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FluidBackground } from "@/components/FluidBackground";
import "./globals.css";

const siteUrl = "https://clanker-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Clanker — AI engineering lab",
    template: "%s | clanker.site",
  },
  description:
    "Watch FFXI Agent Lab live and inspect the bounded AI control system, evidence, constraints, and engineering tradeoffs behind it.",
  keywords: [
    "build in public",
    "AI engineering",
    "data engineering",
    "developer tools",
    "AI prototypes",
    "build in public",
    "Pablo De La Cruz",
  ],
  openGraph: {
    title: "Clanker — AI engineering lab",
    description:
      "FFXI Agent Lab is a bounded AI control system progressing through an isolated game world, streamed live with the engineering work visible.",
    url: siteUrl,
    siteName: "clanker.site",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clanker — AI engineering lab",
    description:
      "Watch FFXI Agent Lab live and inspect the bounded AI control system behind it.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/avatar-clanker.svg", type: "image/svg+xml" }],
    shortcut: "/avatar-clanker.svg",
    apple: "/avatar-clanker.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <FluidBackground />
        <div className="relative z-10">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
