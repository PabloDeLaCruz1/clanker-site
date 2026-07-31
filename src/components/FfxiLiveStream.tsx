"use client";

import { useEffect, useState } from "react";
import { FFXI_YOUTUBE_CHANNEL_ID, FFXI_YOUTUBE_LIVE_URL } from "@/lib/youtubeLive";

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
        {playerAvailable ? (
          <iframe
            key={stream.videoId}
            src={stream.embedUrl}
            title={stream.title ? `${stream.title} — live on YouTube` : "FFXI AI Agent live stream"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="live-stream-fallback">
            <p className="status-pill status-live">{stream ? "Channel status" : "Checking channel"}</p>
            <p className="mt-4 text-xl font-semibold text-orange-50">
              {stream?.status === "offline"
                ? "The channel is offline right now."
                : stream?.status === "unavailable"
                  ? "The live player could not be resolved."
                  : "Finding the current broadcast…"}
            </p>
            <p className="mt-2 max-w-lg text-sm leading-6 text-orange-100/60">
              Open the channel directly for scheduled streams, replays, and the latest live status.
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-orange-50/68">
          The site checks the channel every minute and embeds the active public broadcast by its current video
          ID. Restarting tomorrow’s stream requires no site release.
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
