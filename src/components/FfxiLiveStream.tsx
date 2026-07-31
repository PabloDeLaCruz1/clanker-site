"use client";

import { useEffect, useState } from "react";
import {
  FFXI_YOUTUBE_CHANNEL_ID,
  FFXI_YOUTUBE_LIVE_URL,
  FFXI_YOUTUBE_UPLOADS_EMBED_URL,
} from "@/lib/youtubeLive";

type LiveState = {
  channelId: string;
  channelUrl: string;
  checkedAt: string;
  embedUrl?: string;
  live: boolean;
  status: "live" | "offline" | "unavailable";
  title?: string;
  videoId?: string;
};

export function FfxiLiveStream() {
  const [stream, setStream] = useState<LiveState | null>(null);

  useEffect(() => {
    let active = true;

    async function refreshStream() {
      try {
        const response = await fetch("/api/youtube-live", { cache: "no-store" });
        if (!response.ok) {
          throw new Error(`Live status returned HTTP ${response.status}`);
        }

        const nextStream = (await response.json()) as LiveState;
        if (active) {
          setStream(nextStream);
        }
      } catch {
        if (active) {
          setStream((current) =>
            current?.live
              ? current
              : {
                  channelId: FFXI_YOUTUBE_CHANNEL_ID,
                  channelUrl: FFXI_YOUTUBE_LIVE_URL,
                  checkedAt: new Date().toISOString(),
                  live: false,
                  status: "unavailable",
                },
          );
        }
      }
    }

    void refreshStream();
    const refreshTimer = window.setInterval(refreshStream, 60_000);

    return () => {
      active = false;
      window.clearInterval(refreshTimer);
    };
  }, []);

  const playerAvailable = stream?.live && stream.embedUrl && stream.videoId;
  const playerUrl = playerAvailable ? stream.embedUrl : FFXI_YOUTUBE_UPLOADS_EMBED_URL;
  const playerTitle = playerAvailable
    ? stream.title
      ? `${stream.title} — live on YouTube`
      : "FFXI AI Agent live stream"
    : "Latest FFXI AI Agent stream from YouTube";

  return (
    <section className="live-stream-card mt-12" id="live-stream" aria-labelledby="live-stream-heading">
      <div className="section-intro">
        <div>
          <p className="kicker text-xs">New main project · YouTube livestream</p>
          <h2
            className="mt-2 text-2xl font-semibold tracking-tight text-orange-50"
            id="live-stream-heading"
          >
            FFXI Agent Lab
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-orange-100/60">
          A bounded AI agent progressing through an isolated, FFXI-compatible private-server lab.
        </p>
      </div>

      <div className="live-stream-frame mt-5" aria-live="polite">
        <iframe
          key={playerAvailable ? stream.videoId : "channel-uploads"}
          src={playerUrl}
          title={playerTitle}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="mt-3 text-xs leading-5 text-orange-100/55" aria-live="polite">
        {playerAvailable
          ? "Live broadcast resolved directly."
          : "Showing the channel’s newest stream while live-status resolution runs in the background."}
      </p>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-orange-50/68">
          The player loads the channel’s newest stream immediately, then checks every minute for an exact active
          broadcast. Restarting tomorrow’s stream requires no site release.
        </p>
        <div className="action-row shrink-0">
          <a
            className="action-primary"
            href={FFXI_YOUTUBE_LIVE_URL}
            rel="noopener noreferrer"
            target="_blank"
          >
            Watch on YouTube ↗
          </a>
          <a
            className="action-secondary"
            href="https://github.com/pablodcruz/ffxi-agents-server"
            rel="noopener noreferrer"
            target="_blank"
          >
            Inspect the source ↗
          </a>
        </div>
      </div>
    </section>
  );
}
