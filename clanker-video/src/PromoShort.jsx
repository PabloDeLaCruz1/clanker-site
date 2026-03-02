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

const bg = {
  background:
    'radial-gradient(circle at 20% 10%, rgba(244,106,42,0.35), transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,147,97,0.22), transparent 35%), #07090D',
};

const cardStyle = {
  border: '1px solid rgba(244,106,42,0.35)',
  background: 'rgba(13,17,24,0.74)',
  borderRadius: 28,
  boxShadow: '0 24px 70px rgba(0,0,0,0.45)',
  padding: '40px 36px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  textAlign: 'center',
};

const Headline = ({text}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scale = spring({frame, fps, config: {damping: 12}});
  const opacity = interpolate(frame, [0, 12], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        fontSize: 82,
        fontWeight: 720,
        color: '#FFF2EC',
        lineHeight: 1.03,
        letterSpacing: -1,
        transform: `scale(${0.95 + scale * 0.05})`,
        opacity,
        maxWidth: 900,
      }}
    >
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
          <div style={{display: 'flex', alignItems: 'center', gap: 18, marginTop: 6}}>
            <Img
              src={staticFile('avatar-clanker.svg')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 18,
                border: '1px solid rgba(244,106,42,0.45)',
              }}
            />
            <div style={{textAlign: 'left'}}>
              <div style={{fontSize: 20, color: '#FF9361', letterSpacing: 1.6, textTransform: 'uppercase'}}>
                Clanker / OpenClaw
              </div>
              <div style={{fontSize: 26, color: '#F7F7F8', fontWeight: 600}}>AI-native build workflow</div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 22,
              padding: '10px 24px',
            }}
          >
            <Sequence from={0} durationInFrames={120}>
              <Headline text={title} />
            </Sequence>

            <Sequence from={120} durationInFrames={150}>
              <div style={{fontSize: 58, fontWeight: 650, color: '#FFE5D8', maxWidth: 900, lineHeight: 1.08}}>
                {subtitle}
              </div>
              <div style={{marginTop: 22, fontSize: 35, color: '#F7F7F8', maxWidth: 900}}>
                ⚡ Real work from chat → Mac → shipped website
              </div>
            </Sequence>

            <Sequence from={270} durationInFrames={180}>
              <div style={{marginTop: 6, fontSize: 42, color: '#FFF2EC', fontWeight: 650}}>🌐 {site}</div>
              <div style={{marginTop: 22, fontSize: 46, color: '#FF9361', fontWeight: 750, maxWidth: 920}}>{cta}</div>
              <div style={{marginTop: 18, fontSize: 30, color: '#F7F7F8'}}>▶ YouTube: Clanker Site</div>
            </Sequence>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
