export type FeedTopic = "stocks" | "crypto";

export type FeedItem = {
  title: string;
  link: string;
  pubDate?: string;
  source?: string;
  topic: FeedTopic;
};

export function decodeHtml(input: string) {
  return input
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

export function extractFeedItems(xml: string, topic: FeedTopic): FeedItem[] {
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
