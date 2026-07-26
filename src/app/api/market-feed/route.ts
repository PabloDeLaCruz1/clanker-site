import { NextResponse } from "next/server";
import { extractFeedItems, type FeedItem } from "@/lib/marketFeed";

export const dynamic = "force-dynamic";

const FEEDS = [
  {
    topic: "stocks" as const,
    url: "https://news.google.com/rss/search?q=stock+market+today+S%26P+500+Nasdaq+Dow&hl=en-US&gl=US&ceid=US:en",
  },
  {
    topic: "stocks" as const,
    url: "https://feeds.finance.yahoo.com/rss/2.0/headline?s=%5EGSPC,%5EIXIC,%5EDJI&region=US&lang=en-US",
  },
  {
    topic: "crypto" as const,
    url: "https://news.google.com/rss/search?q=bitcoin+ethereum+crypto+market+today&hl=en-US&gl=US&ceid=US:en",
  },
  {
    topic: "crypto" as const,
    url: "https://cointelegraph.com/rss",
  },
];

export async function GET() {
  const responses = await Promise.all(
    FEEDS.map(async (feed) => {
      try {
        const res = await fetch(feed.url, {
          next: { revalidate: 300 },
          signal: AbortSignal.timeout(5_000),
        });
        if (!res.ok) return [] as FeedItem[];
        const xml = await res.text();
        return extractFeedItems(xml, feed.topic);
      } catch {
        return [] as FeedItem[];
      }
    }),
  );

  const seen = new Set<string>();
  const merged = responses
    .flat()
    .filter((item) => {
      const key = item.link.split("?")[0];
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 12);

  return NextResponse.json(
    { updatedAt: new Date().toISOString(), items: merged },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=900" } },
  );
}
