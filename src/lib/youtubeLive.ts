export const FFXI_YOUTUBE_CHANNEL_ID = "UCk7Zu8JfJLEhn4_2EYT7tMg";
export const FFXI_YOUTUBE_HANDLE = "ffxi-ai-agent";
export const FFXI_YOUTUBE_LIVE_URL = `https://www.youtube.com/@${FFXI_YOUTUBE_HANDLE}/live`;
export const FFXI_YOUTUBE_FEED_URL =
  `https://www.youtube.com/feeds/videos.xml?channel_id=${FFXI_YOUTUBE_CHANNEL_ID}`;
export const FFXI_YOUTUBE_UPLOADS_PLAYLIST_ID = FFXI_YOUTUBE_CHANNEL_ID.replace(/^UC/, "UU");
export const FFXI_YOUTUBE_UPLOADS_EMBED_URL =
  `https://www.youtube.com/embed/videoseries?list=${FFXI_YOUTUBE_UPLOADS_PLAYLIST_ID}` +
  "&autoplay=1&mute=1&rel=0";

export type YouTubeLiveBroadcast = {
  resolutionSource: "channel-feed" | "channel-live-page";
  videoId: string;
  title: string;
};

function decodeJsonString(value: string) {
  try {
    return JSON.parse(`"${value}"`) as string;
  } catch {
    return value;
  }
}

export function parseYouTubeLivePage(
  html: string,
  resolutionSource: YouTubeLiveBroadcast["resolutionSource"] = "channel-live-page",
): YouTubeLiveBroadcast | null {
  const details = html.match(
    /"videoDetails":\{"videoId":"([A-Za-z0-9_-]{11})"[\s\S]*?"title":"((?:\\.|[^"\\])*)"[\s\S]*?"isLiveContent":true/,
  );

  const explicitlyLive = /"isLiveNow":true/.test(html);
  const activeTimestampWindow = /"startTimestamp":"[^"]+"/.test(html) && !/"endTimestamp":"[^"]+"/.test(html);

  if (!details || (!explicitlyLive && !activeTimestampWindow)) {
    return null;
  }

  return {
    resolutionSource,
    videoId: details[1],
    title: decodeJsonString(details[2]),
  };
}

export function parseYouTubeFeedVideoIds(xml: string, limit = 5) {
  return Array.from(xml.matchAll(/<yt:videoId>([A-Za-z0-9_-]{11})<\/yt:videoId>/g))
    .map((match) => match[1])
    .filter((videoId, index, videoIds) => videoIds.indexOf(videoId) === index)
    .slice(0, limit);
}

async function fetchYouTubeText(url: string) {
  const response = await fetch(url, {
    headers: {
      accept: "text/html,application/xhtml+xml,application/xml;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "user-agent":
        "Mozilla/5.0 (compatible; ClankerLiveResolver/1.0; +https://clanker-site.vercel.app)",
    },
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error(`YouTube returned HTTP ${response.status} for ${url}`);
  }

  return response.text();
}

export async function resolveFfxiLiveBroadcast(): Promise<YouTubeLiveBroadcast | null> {
  try {
    const livePage = await fetchYouTubeText(`${FFXI_YOUTUBE_LIVE_URL}?hl=en&gl=US`);
    const directBroadcast = parseYouTubeLivePage(livePage, "channel-live-page");
    if (directBroadcast) {
      return directBroadcast;
    }
  } catch (error) {
    console.warn("Primary YouTube live-page resolution failed", error);
  }

  const feed = await fetchYouTubeText(FFXI_YOUTUBE_FEED_URL);
  const recentVideoIds = parseYouTubeFeedVideoIds(feed, 3);

  for (const videoId of recentVideoIds) {
    try {
      const watchPage = await fetchYouTubeText(
        `https://www.youtube.com/watch?v=${encodeURIComponent(videoId)}&hl=en&gl=US`,
      );
      const broadcast = parseYouTubeLivePage(watchPage, "channel-feed");

      if (broadcast?.videoId === videoId) {
        return broadcast;
      }
    } catch (error) {
      console.warn(`YouTube feed candidate ${videoId} could not be checked`, error);
    }
  }

  return null;
}
