import { Button } from '@/components/ui/button';
import { Minus } from 'lucide-react';
import React from 'react';

export function LayerControlNode({ data }: any) {
  return (
    <div className='flex items-center justify-center rounded-full border border-gray-300 bg-indigo-200'>
      <Button
        variant='ghost'
        className='h-10 w-10 rounded-full p-1 hover:bg-indigo-300'
        onClick={(e) => {
          e.stopPropagation();
          data.onClick();
        }}
      >
        <Minus className='text-black' />
      </Button>
    </div>
  );
}
