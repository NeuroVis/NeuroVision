export function NetworkOutput({
  testLoss = 0,
  trainingLoss = 0
}: {
  testLoss?: number;
  trainingLoss?: number;
}) {
  return (
    <div className={'flex w-[160px] flex-col gap-2'}>
      <p className={'text-md pl-2'}>Output</p>
      <p className={'text-sm'}>Test loss {testLoss.toFixed(3)}</p>
      <p className={'text-sm'}>Training loss {trainingLoss.toFixed(3)}</p>
    </div>
  );
}
