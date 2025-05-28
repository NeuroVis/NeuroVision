import React from 'react';
import { Button } from '@/components/ui/button';
import { Minus, Plus } from 'lucide-react';

export function PlaceholderNode({ data }: any) {
  return <div className="flex justify-center items-center rounded-full bg-indigo-200 border border-gray-300">
    <Button
      variant="ghost"
      className="rounded-full p-1 w-10 h-10 hover:bg-indigo-300"
      onClick={(e) => {
        e.stopPropagation();
        data.onClick();
      }}
    >
      <Plus className="text-black" />
    </Button>
  </div>;
}