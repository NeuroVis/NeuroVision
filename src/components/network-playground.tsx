'use client';

import { PlayPause } from '@/components/form/play-pause';
import { NetworkConfigOptions } from '@/components/form/network-config-options';
import { DatasetConfig } from '@/components/form/dataset-config';
import { ReactFlowProvider } from '@xyflow/react';
import NeuralNetworkEditor from '@/components/network-editor';
import { NetworkOutput } from '@/components/form/network-output';
import { OutputMap } from '@/components/output-map';
import { PlaygroundContextProvider } from '@/lib/playground-context';
import { LossChart } from '@/components/loss-chart';

export default function NetworkPlayground() {
  return (
    <PlaygroundContextProvider >
      <div className='pb-20'>
        <div className='sticky top-[50px] left-0 z-[1000] flex justify-around bg-white py-1  shadow-xl'>
          <PlayPause />
          <NetworkConfigOptions />
        </div>
        <div className='flex flex-col-reverse items-center justify-around gap-2 2xl:flex-row'>
          <DatasetConfig />
          <div className='flex flex-col items-center justify-around gap-2 xl:flex-row'>
            <div className={'flex flex-col justify-center'}>
              <ReactFlowProvider>
                <NeuralNetworkEditor />
              </ReactFlowProvider>
            </div>
            <div className='flex flex-col items-center'>
              <LossChart />
              <OutputMap />
              <NetworkOutput />
            </div>
          </div>
        </div>
      </div>
    </PlaygroundContextProvider>
  );
}
