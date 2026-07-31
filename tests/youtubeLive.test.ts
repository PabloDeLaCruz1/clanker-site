import assert from "node:assert/strict";
import test from "node:test";
import { parseYouTubeFeedVideoIds, parseYouTubeLivePage } from "../src/lib/youtubeLive";

test("parseYouTubeLivePage returns the current active broadcast", () => {
  const html = `
    <script>
      {"videoDetails":{"videoId":"3yYlFJxYRCk","title":"Rank 4 \\u0026 telemetry","isLiveContent":true},
      "liveBroadcastDetails":{"isLiveNow":true}}
    </script>
  `;

  assert.deepEqual(parseYouTubeLivePage(html), {
    resolutionSource: "channel-live-page",
    videoId: "3yYlFJxYRCk",
    title: "Rank 4 & telemetry",
  });
});

test("parseYouTubeLivePage accepts an active timestamp window when regional markup omits isLiveNow", () => {
  const html = `
    {"videoDetails":{"videoId":"3yYlFJxYRCk","title":"Live now","isLiveContent":true},
    "liveBroadcastDetails":{"startTimestamp":"2026-07-31T19:56:40+00:00"}}
  `;

  assert.deepEqual(parseYouTubeLivePage(html, "channel-feed"), {
    resolutionSource: "channel-feed",
    videoId: "3yYlFJxYRCk",
    title: "Live now",
  });
});

test("parseYouTubeLivePage rejects a replay or offline channel", () => {
  const html = `
    {"videoDetails":{"videoId":"3yYlFJxYRCk","title":"Replay","isLiveContent":true},
    "liveBroadcastDetails":{"isLiveNow":false}}
  `;

  assert.equal(parseYouTubeLivePage(html), null);
});

test("parseYouTubeFeedVideoIds returns unique recent channel entries", () => {
  const xml = `
    <entry><yt:videoId>3yYlFJxYRCk</yt:videoId></entry>
    <entry><yt:videoId>HwYJDPhAbOQ</yt:videoId></entry>
    <entry><yt:videoId>3yYlFJxYRCk</yt:videoId></entry>
  `;

  assert.deepEqual(parseYouTubeFeedVideoIds(xml), ["3yYlFJxYRCk", "HwYJDPhAbOQ"]);
});
