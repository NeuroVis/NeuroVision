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
    <PlaygroundContextProvider>
      <div>
        <div className='flex justify-around py-1 pt-3 shadow-xl'>
          <PlayPause />
          <NetworkConfigOptions />
        </div>
        <div className='flex flex-row items-center justify-around gap-2 pt-4'>
          <DatasetConfig />
          <div className={'flex flex-col justify-center'}>
            <ReactFlowProvider>
              <NeuralNetworkEditor />
            </ReactFlowProvider>
          </div>
          <NetworkOutput />
          <div>
            <LossChart />
            <OutputMap />
          </div>
        </div>
      </div>
    </PlaygroundContextProvider>
  );
}
