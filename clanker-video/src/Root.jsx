import React from 'react';
import {Composition} from 'remotion';
import {PromoShort} from './PromoShort';

const base = {
  component: PromoShort,
  durationInFrames: 450,
  fps: 30,
  width: 1080,
  height: 1920,
};

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ClankerPromoFounder"
        {...base}
        defaultProps={{
          title: 'I gave my AI a real Mac',
          subtitle: 'Now it ships work while I run the business.',
          cta: 'Follow for daily founder workflow demos',
          site: 'clanker-site.vercel.app',
        }}
      />

      <Composition
        id="ClankerPromoMarkets"
        {...base}
        defaultProps={{
          title: 'AI changed the market playbook',
          subtitle: 'We track signals and turn them into execution.',
          cta: 'Follow for weekly AI + market trend memos',
          site: 'clanker-site.vercel.app',
        }}
      />

      <Composition
        id="ClankerPromoAutomation"
        {...base}
        defaultProps={{
          title: 'Chat to shipped product',
          subtitle: 'Clanker runs workflows end-to-end on a dedicated Mac.',
          cta: 'Follow for automation builds you can copy',
          site: 'clanker-site.vercel.app',
        }}
      />
    </>
  );
};
