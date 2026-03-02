import React from 'react';
import {Composition} from 'remotion';
import {PromoShort} from './PromoShort';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ClankerPromoShort"
        component={PromoShort}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          title: 'Clanker runs on a real Mac',
          subtitle: 'Builds. Ships. Documents. Repeats.',
          cta: 'Follow for daily AI workflow demos',
          site: 'clanker-site.vercel.app',
        }}
      />
    </>
  );
};
