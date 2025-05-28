import { Button } from '@/components/ui/button';
import { CustomSlider } from '@/components/scrollable';
import { usePlaygroundContext } from '@/lib/playground-context';

export function DatasetConfig() {
  const {
    trainingRatio,
    setTrainingRatio,
    noise,
    setNoise,
    batchSize,
    setBatchSize
  } = usePlaygroundContext();

  return (
    <div className={'flex flex-col gap-4'}>
      <div className={'flex w-[160px] flex-col gap-2'}>
        <p className={'text-md pl-2'}>Data</p>
        <p className={'text-sm'}>Which dataset do you want to use?</p>
        <div className={'flex w-[100px] flex-wrap gap-3 pl-2'}>
          <Button className={'rounded-full px-4.5 hover:bg-indigo-300'} />
          <Button className={'rounded-full px-4.5 hover:bg-indigo-300'} />
        </div>
      </div>
      <CustomSlider
        value={trainingRatio}
        setValue={setTrainingRatio}
        text1='Ratio of training to test data: '
        text2={'%'}
        min={10}
        max={90}
        defval={10}
        step={10}
      />
      <CustomSlider
        value={noise}
        setValue={setNoise}
        text1={'Noise: '}
        min={0}
        max={50}
        defval={0}
        step={5}
      />
      <CustomSlider
        value={batchSize}
        setValue={setBatchSize}
        text1={'Batch size: '}
        min={1}
        max={30}
        defval={1}
        step={1}
      />
      <Button className={'w-[170px] rounded-full'}>Regenerate</Button>
    </div>
  );
}
