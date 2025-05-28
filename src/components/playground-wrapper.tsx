'use client';

import dynamic from 'next/dynamic';

const Playground = dynamic(() => import('./network-playground'), {
  ssr: false
});

export function PlaygroundWrapper({ config }: { config: any }) {
  return <Playground config={config} />;
}
