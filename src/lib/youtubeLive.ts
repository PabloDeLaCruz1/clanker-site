export const FFXI_YOUTUBE_CHANNEL_ID = "UCk7Zu8JfJLEhn4_2EYT7tMg";
export const FFXI_YOUTUBE_HANDLE = "ffxi-ai-agent";
export const FFXI_YOUTUBE_LIVE_URL = `https://www.youtube.com/@${FFXI_YOUTUBE_HANDLE}/live`;

export type YouTubeLiveBroadcast = {
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

export function parseYouTubeLivePage(html: string): YouTubeLiveBroadcast | null {
  if (!/"isLiveNow":true/.test(html)) {
    return null;
  }

  const details = html.match(
    /"videoDetails":\{"videoId":"([A-Za-z0-9_-]{11})"[\s\S]*?"title":"((?:\\.|[^"\\])*)"[\s\S]*?"isLiveContent":true/,
  );

  if (!details) {
    return null;
  }

  return {
    videoId: details[1],
    title: decodeJsonString(details[2]),
  };
}

export async function resolveFfxiLiveBroadcast(): Promise<YouTubeLiveBroadcast | null> {
  const response = await fetch(FFXI_YOUTUBE_LIVE_URL, {
    headers: {
      accept: "text/html,application/xhtml+xml",
      "accept-language": "en-US,en;q=0.9",
      "user-agent":
        "Mozilla/5.0 (compatible; ClankerLiveResolver/1.0; +https://clanker-site.vercel.app)",
    },
    next: { revalidate: 30 },
  });

  if (!response.ok) {
    throw new Error(`YouTube live page returned HTTP ${response.status}`);
  }

  return parseYouTubeLivePage(await response.text());
}
