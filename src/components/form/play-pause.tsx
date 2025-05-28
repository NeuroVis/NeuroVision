import { Button } from '@/components/ui/button';
import { Play, RotateCcw, SkipForward } from 'lucide-react';
import { usePlaygroundContext } from '@/lib/playground-context';

function formatWithDotSeparator(num: number) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function PlayPause() {
  const { onPlay, onSkipForward, onReset, epoch } = usePlaygroundContext();

  return (
    <div className='flex items-center justify-center gap-2 pl-2'>
      <Button
        onClick={onSkipForward}
        className='cursor-pointer rounded-full bg-transparent py-5.5 hover:bg-indigo-300'
      >
        <RotateCcw className='size-5 text-black' />
      </Button>
      <Button
        onClick={onPlay}
        className='cursor-pointer rounded-full bg-indigo-800 py-6.5 hover:bg-indigo-950'
      >
        <Play className='size-7 fill-white text-white' />
      </Button>
      <Button
        onClick={onReset}
        className='cursor-pointer rounded-full bg-transparent py-5.5 hover:bg-indigo-300'
      >
        <SkipForward className='size-5 text-black' />
      </Button>
      <div className='flex flex-col gap-1 pl-6 text-black'>
        <p className='font-normal text-black'>Epoch</p>
        <h1 className='text-[22px]'>{formatWithDotSeparator(epoch)}</h1>
      </div>
    </div>
  );
}
