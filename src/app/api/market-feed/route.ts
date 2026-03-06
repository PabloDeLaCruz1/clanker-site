import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
  source?: string;
  topic: "stocks" | "crypto";
};

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

function decodeHtml(input: string) {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function extractItems(xml: string, topic: "stocks" | "crypto"): FeedItem[] {
  const items: FeedItem[] = [];
  const chunks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];

  for (const chunk of chunks.slice(0, 8)) {
    const title =
      chunk.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.slice(1).find(Boolean) ?? "";
    const link = chunk.match(/<link>(.*?)<\/link>/)?.[1] ?? "";
    const pubDate = chunk.match(/<pubDate>(.*?)<\/pubDate>/)?.[1];
    const source = chunk.match(/<source[^>]*>(.*?)<\/source>/)?.[1];

    if (!title || !link) continue;

    items.push({
      title: decodeHtml(title.trim()),
      link: link.trim(),
      pubDate,
      source: source ? decodeHtml(source.trim()) : undefined,
      topic,
    });
  }

  return items;
}

export async function GET() {
  try {
    const responses = await Promise.all(
      FEEDS.map(async (feed) => {
        const res = await fetch(feed.url, { cache: "no-store" });
        if (!res.ok) return [] as FeedItem[];
        const xml = await res.text();
        return extractItems(xml, feed.topic);
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
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return NextResponse.json(
      { updatedAt: new Date().toISOString(), items: [] },
      { status: 200, headers: { "Cache-Control": "no-store" } },
    );
  }
}
