"use client";

import { useEffect, useState } from "react";

type FeedItem = {
  title: string;
  link: string;
  source?: string;
  topic: "stocks" | "crypto";
};

export function MarketFeed() {
  const [items, setItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      const res = await fetch("/api/market-feed", { cache: "no-store" });
      const data = await res.json();
      if (mounted) setItems(data.items ?? []);
    };

    load();
    const id = window.setInterval(load, 10 * 60 * 1000);
    return () => {
      mounted = false;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="section-card">
      <p className="text-xs uppercase tracking-[0.12em] text-orange-200/70">📰 Market + Crypto Feed</p>
      <div className="mt-3 space-y-2 text-sm text-orange-50/90">
        {items.length === 0 ? (
          <p className="text-orange-100/60">Loading headlines...</p>
        ) : (
          items.slice(0, 6).map((item) => (
            <a
              key={`${item.topic}-${item.link}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg border border-orange-300/15 bg-orange-200/[0.03] px-3 py-2 hover:border-orange-300/40"
            >
              <span className="mr-2 inline-block rounded-full border border-orange-300/30 px-2 py-0.5 text-[10px] uppercase tracking-wide text-orange-200/80">
                {item.topic}
              </span>
              {item.title}
              {item.source ? <span className="ml-2 text-orange-100/60">• {item.source}</span> : null}
            </a>
          ))
        )}
      </div>
    </div>
  );
}
