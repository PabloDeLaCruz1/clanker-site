export const FFXI_YOUTUBE_CHANNEL_ID = "UCk7Zu8JfJLEhn4_2EYT7tMg";
export const FFXI_YOUTUBE_HANDLE = "ffxi-ai-agent";
export const FFXI_YOUTUBE_LIVE_URL = `https://www.youtube.com/@${FFXI_YOUTUBE_HANDLE}/live`;
export const FFXI_YOUTUBE_EMBED_URL =
  `https://www.youtube.com/embed/live_stream?channel=${FFXI_YOUTUBE_CHANNEL_ID}` +
  "&autoplay=1&mute=1&rel=0";

export function FfxiLiveStream() {
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

      <div className="live-stream-frame mt-5">
        <iframe
          src={FFXI_YOUTUBE_EMBED_URL}
          title="FFXI AI Agent live stream"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>

      <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm leading-6 text-orange-50/68">
          This player follows the channel, not one video ID. When a new public livestream starts on the
          same channel, the site picks it up automatically without a code change.
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
