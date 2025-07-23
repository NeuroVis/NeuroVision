'use client';

import dynamic from 'next/dynamic';

const Playground = dynamic(() => import('../../components/network-playground'), {
  ssr: false
});

export default function PlaygroundWrapper() {
  return <Playground/>;
}
