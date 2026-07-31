import assert from "node:assert/strict";
import test from "node:test";
import { parseYouTubeLivePage } from "../src/lib/youtubeLive";

test("parseYouTubeLivePage returns the current active broadcast", () => {
  const html = `
    <script>
      {"videoDetails":{"videoId":"3yYlFJxYRCk","title":"Rank 4 \\u0026 telemetry","isLiveContent":true},
      "liveBroadcastDetails":{"isLiveNow":true}}
    </script>
  `;

  assert.deepEqual(parseYouTubeLivePage(html), {
    videoId: "3yYlFJxYRCk",
    title: "Rank 4 & telemetry",
  });
});

test("parseYouTubeLivePage rejects a replay or offline channel", () => {
  const html = `
    {"videoDetails":{"videoId":"3yYlFJxYRCk","title":"Replay","isLiveContent":true},
    "liveBroadcastDetails":{"isLiveNow":false}}
  `;

  assert.equal(parseYouTubeLivePage(html), null);
});
