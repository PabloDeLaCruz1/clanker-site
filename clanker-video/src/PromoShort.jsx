import React from 'react';
import {AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig, staticFile, Sequence} from 'remotion';

const bg = {
  background: 'radial-gradient(circle at 20% 10%, rgba(244,106,42,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,147,97,0.22), transparent 35%), #07090D',
};

const cardStyle = {
  border: '1px solid rgba(244,106,42,0.35)',
  background: 'rgba(13,17,24,0.74)',
  borderRadius: 28,
  boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
  padding: '48px 44px',
};

const Headline = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame, fps, config: {damping: 12}});
  const opacity = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div style={{fontSize: 74, fontWeight: 700, color: '#FFF2EC', lineHeight: 1.05, transform: `scale(${0.95 + scale * 0.05})`, opacity}}>
      {text}
    </div>
  );
};

export const PromoShort = ({title, subtitle, cta, site}) => {
  const frame = useCurrentFrame();
  const glow = interpolate(frame, [0, 450], [0.75, 1]);

  return (
    <AbsoluteFill style={{...bg, fontFamily: 'Inter, system-ui, sans-serif'}}>
      <AbsoluteFill style={{opacity: glow}}>
        <div style={{position: 'absolute', inset: 40, ...cardStyle}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24}}>
            <Img src={staticFile('avatar-clanker.svg')} style={{width: 92, height: 92, borderRadius: 20, border: '1px solid rgba(244,106,42,0.45)'}} />
            <div>
              <div style={{fontSize: 24, color: '#FF9361', letterSpacing: 2, textTransform: 'uppercase'}}>Clanker / OpenClaw</div>
              <div style={{fontSize: 30, color: '#F7F7F8', fontWeight: 600}}>AI-native build workflow</div>
            </div>
          </div>

          <Sequence from={0} durationInFrames={120}>
            <Headline text={title} />
          </Sequence>

          <Sequence from={120} durationInFrames={150}>
            <div style={{fontSize: 56, fontWeight: 650, color: '#FFE5D8', marginTop: 8}}>{subtitle}</div>
            <div style={{marginTop: 26, fontSize: 34, color: '#F7F7F8'}}>⚡ Real work from chat → Mac → shipped website</div>
          </Sequence>

          <Sequence from={270} durationInFrames={180}>
            <div style={{marginTop: 14, fontSize: 42, color: '#FFF2EC', fontWeight: 650}}>🌐 {site}</div>
            <div style={{marginTop: 24, fontSize: 44, color: '#FF9361', fontWeight: 700}}>{cta}</div>
            <div style={{marginTop: 28, fontSize: 30, color: '#F7F7F8'}}>▶️ YouTube: Clanker Site</div>
          </Sequence>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
