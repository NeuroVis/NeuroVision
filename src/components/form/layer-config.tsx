import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';
import React from 'react';

export function LayerConfig({
  addLayer,
  deleteLayer
}: {
  addLayer: () => void;
  deleteLayer: () => void;
}) {
  return (
    <div className={'flex w-[760px] flex-col gap-1'}>
      <div className={'flex flex-row items-center justify-center gap-3'}>
        <Button
          onClick={() => {
            addLayer();
          }}
          className='h-10 rounded-full bg-indigo-950 text-white hover:bg-indigo-600'
        >
          <Plus className='text-white' />
        </Button>
        <p className={'text-md self-center'}>Hidden layers</p>
        <Button
          onClick={() => deleteLayer()}
          className='h-10 rounded-full bg-indigo-950 text-white hover:bg-indigo-600'
        >
          <Minus className='text-white' />
        </Button>
      </div>
      <div className={'h-4 border-x-2 border-t-2 border-indigo-800'}></div>
    </div>
  );
}
