import { NextResponse } from "next/server";
import {
  FFXI_YOUTUBE_CHANNEL_ID,
  FFXI_YOUTUBE_LIVE_URL,
  resolveFfxiLiveBroadcast,
} from "@/lib/youtubeLive";

export const dynamic = "force-dynamic";

const responseHeaders = {
  "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
};

export async function GET() {
  const checkedAt = new Date().toISOString();

  try {
    const broadcast = await resolveFfxiLiveBroadcast();

    if (!broadcast) {
      return NextResponse.json(
        {
          channelId: FFXI_YOUTUBE_CHANNEL_ID,
          channelUrl: FFXI_YOUTUBE_LIVE_URL,
          checkedAt,
          live: false,
          status: "offline",
        },
        { headers: responseHeaders },
      );
    }

    return NextResponse.json(
      {
        channelId: FFXI_YOUTUBE_CHANNEL_ID,
        channelUrl: FFXI_YOUTUBE_LIVE_URL,
        checkedAt,
        embedUrl: `https://www.youtube.com/embed/${broadcast.videoId}?autoplay=1&mute=1&rel=0`,
        live: true,
        resolutionSource: broadcast.resolutionSource,
        status: "live",
        title: broadcast.title,
        videoId: broadcast.videoId,
      },
      { headers: responseHeaders },
    );
  } catch (error) {
    console.error("Unable to resolve the FFXI AI Agent livestream", error);

    return NextResponse.json(
      {
        channelId: FFXI_YOUTUBE_CHANNEL_ID,
        channelUrl: FFXI_YOUTUBE_LIVE_URL,
        checkedAt,
        live: false,
        status: "unavailable",
      },
      { headers: responseHeaders },
    );
  }
}
