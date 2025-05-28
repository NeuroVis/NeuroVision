import { usePlaygroundContext } from '@/lib/playground-context';

export function NetworkOutput() {
  const { testLoss, trainLoss } = usePlaygroundContext();

  return (
    <div className='flex w-[160px] flex-col gap-2'>
      <p className='text-md pl-2'>Output</p>
      <p className='text-sm'>Test loss {testLoss.toFixed(3)}</p>
      <p className='text-sm'>Training loss {trainLoss.toFixed(3)}</p>
    </div>
  );
}
