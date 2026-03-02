import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';

const Headline = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame, fps, config: {damping: 13}});
  const opacity = interpolate(frame, [0, 14], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        fontSize: 86,
        fontWeight: 760,
        color: '#FFF2EC',
        lineHeight: 1.02,
        letterSpacing: -1.5,
        transform: `scale(${0.94 + scale * 0.06})`,
        opacity,
        maxWidth: 920,
        textAlign: 'center',
        textShadow: '0 6px 24px rgba(0,0,0,0.35)',
      }}
    >
      {text}
    </div>
  );
};

export const PromoShort = ({title, subtitle, cta, site}) => {
  const frame = useCurrentFrame();

  const heroScale = interpolate(frame, [0, 450], [1.03, 1], {extrapolateRight: 'clamp'});
  const overlayOpacity = interpolate(frame, [0, 80], [0.45, 0.62], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill style={{fontFamily: 'Inter, system-ui, sans-serif', background: '#07090D'}}>
      <AbsoluteFill>
        <Img
          src={staticFile('openclaw-assets/openclaw-hero.jpg')}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: `scale(${heroScale})`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 18% 14%, rgba(244,106,42,0.34), transparent 42%), radial-gradient(circle at 86% 0%, rgba(255,147,97,0.24), transparent 38%), #07090D',
            opacity: overlayOpacity,
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{padding: 46, justifyContent: 'space-between'}}>
        <div
          style={{
            alignSelf: 'center',
            marginTop: 10,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            border: '1px solid rgba(244,106,42,0.45)',
            borderRadius: 999,
            background: 'rgba(10,12,16,0.72)',
            padding: '10px 18px',
            backdropFilter: 'blur(5px)',
          }}
        >
          <Img src={staticFile('openclaw-assets/pixel-lobster.svg')} style={{width: 28, height: 28}} />
          <div style={{fontSize: 24, color: '#FFE5D8', fontWeight: 620}}>OpenClaw Workflow Demo</div>
        </div>

        <div
          style={{
            margin: '0 auto',
            width: '100%',
            maxWidth: 980,
            minHeight: 900,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: 34,
            border: '1px solid rgba(244,106,42,0.32)',
            background: 'rgba(8,10,16,0.55)',
            boxShadow: '0 24px 70px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            padding: '48px 36px',
            gap: 18,
          }}
        >
          <Sequence from={0} durationInFrames={130}>
            <Headline text={title} />
          </Sequence>

          <Sequence from={120} durationInFrames={150}>
            <div style={{fontSize: 58, fontWeight: 660, color: '#FFE5D8', maxWidth: 920, lineHeight: 1.06}}>{subtitle}</div>
            <div style={{marginTop: 20, fontSize: 36, color: '#F7F7F8', maxWidth: 900}}>
              🌐 Browsing + asset capture + video generation, end-to-end
            </div>
          </Sequence>

          <Sequence from={270} durationInFrames={180}>
            <Img src={staticFile('openclaw-assets/openclaw-logo.png')} style={{width: 330, height: 'auto', marginBottom: 16}} />
            <div style={{fontSize: 40, color: '#FFF2EC', fontWeight: 650}}>📍 {site}</div>
            <div style={{marginTop: 16, fontSize: 44, color: '#FF9361', fontWeight: 760, maxWidth: 920}}>{cta}</div>
          </Sequence>
        </div>

        <div style={{alignSelf: 'center', marginBottom: 6, color: '#F7F7F8', fontSize: 28, opacity: 0.95}}>
          ▶ YouTube: Clanker Site
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
