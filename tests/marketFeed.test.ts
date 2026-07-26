import assert from "node:assert/strict";
import test from "node:test";
import { decodeHtml, extractFeedItems } from "../src/lib/marketFeed";

test("decodeHtml handles the entities used by feed headlines", () => {
  assert.equal(decodeHtml("AI &amp; markets &quot;today&quot;"), 'AI & markets "today"');
});

test("extractFeedItems normalizes RSS items and skips incomplete entries", () => {
  const xml = `
    <rss>
      <channel>
        <item>
          <title><![CDATA[Bitcoin &amp; Ethereum rally]]></title>
          <link>https://example.com/story?ref=rss</link>
          <pubDate>Sat, 25 Jul 2026 12:00:00 GMT</pubDate>
          <source url="https://example.com">Example &amp; Co</source>
        </item>
        <item>
          <title>Missing link</title>
        </item>
      </channel>
    </rss>
  `;

  assert.deepEqual(extractFeedItems(xml, "crypto"), [
    {
      title: "Bitcoin & Ethereum rally",
      link: "https://example.com/story?ref=rss",
      pubDate: "Sat, 25 Jul 2026 12:00:00 GMT",
      source: "Example & Co",
      topic: "crypto",
    },
  ]);
});
