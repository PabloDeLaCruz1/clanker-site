import { NextResponse } from "next/server";

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
    url: "https://news.google.com/rss/search?q=stock+market+today+US&hl=en-US&gl=US&ceid=US:en",
  },
  {
    topic: "crypto" as const,
    url: "https://news.google.com/rss/search?q=crypto+market+today+bitcoin+ethereum&hl=en-US&gl=US&ceid=US:en",
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
    const title = chunk.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>|<title>(.*?)<\/title>/)?.slice(1).find(Boolean) ?? "";
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
        const res = await fetch(feed.url, { next: { revalidate: 600 } });
        const xml = await res.text();
        return extractItems(xml, feed.topic);
      }),
    );

    const merged = responses.flat().slice(0, 12);
    return NextResponse.json({ updatedAt: new Date().toISOString(), items: merged });
  } catch {
    return NextResponse.json({ updatedAt: new Date().toISOString(), items: [] }, { status: 200 });
  }
}
