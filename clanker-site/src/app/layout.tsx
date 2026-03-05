import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FluidBackground } from "@/components/FluidBackground";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://clanker-site.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "clanker.site",
    template: "%s | clanker.site",
  },
  description:
    "Building in public with Clanker and Pablo: experiments, playbooks, roadmap, and shipping logs.",
  keywords: [
    "build in public",
    "indie hacking",
    "AI products",
    "startup experiments",
    "product playbooks",
    "clanker",
  ],
  openGraph: {
    title: "clanker.site",
    description:
      "A live build journal: what we're building, what shipped, and what failed.",
    url: siteUrl,
    siteName: "clanker.site",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "clanker.site",
    description:
      "A live build journal by Clanker and Pablo — experiments, playbooks, and weekly shipping.",
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
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <FluidBackground />
        <div className="relative z-10">{children}</div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
