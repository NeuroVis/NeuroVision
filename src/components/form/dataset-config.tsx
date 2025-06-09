import { Button } from '@/components/ui/button';
import { CustomSlider } from '@/components/scrollable';
import { usePlaygroundContext } from '@/lib/playground-context';
import {
  classifyCircleData,
  classifySpiralData,
  classifyTwoGaussData,
  classifyXORData,
  Example2D
} from '@/lib/generate-data';

export function DatasetConfig() {
  const {
    trainingRatio: numSamples,
    setTrainingRatio: setNumSamples,
    noise,
    setNoise,
    batchSize,
    setBatchSize,
    dataPointsRef,
    updater,
    setUpdater
  } = usePlaygroundContext();

  function generateData(
    genFc: (samples: number, noise: number) => Example2D[]
  ) {
    dataPointsRef.current = genFc(numSamples, noise).map((el) => {
      return {
        x: el.x * 10 + 60,
        y: el.y * 10 + 60,
        label: el.label
      };
    });

    setUpdater(!updater);
  }

  return (
    <div className='flex flex-row gap-20 2xl:flex-col'>
      <div className='flex flex-col gap-2'>
        <p className='text-md pl-2'>Data</p>
        <p className='text-sm'>Which dataset do you want to use?</p>
        <div className='flex aspect-square w-full grid-cols-2 flex-row gap-3 gap-x-2 gap-y-2 pl-2 2xl:grid 2xl:flex-col'>
          <img
            onClick={() => {
              generateData(classifyXORData);
            }}
            className='h-20 w-20 cursor-pointer rounded-xl hover:brightness-50'
            src='/xor.png'
            alt='img'
          />
          <img
            onClick={() => {
              generateData(classifyTwoGaussData);
            }}
            className='h-20 w-20 cursor-pointer rounded-xl hover:brightness-50'
            src='/two-gauss.png'
            alt='img'
          />
          <img
            onClick={() => {
              generateData(classifyCircleData);
            }}
            className='h-20 w-20 cursor-pointer rounded-xl hover:brightness-50'
            src='/circle.png'
            alt='img'
          />
          <img
            onClick={() => {
              generateData(classifySpiralData);
            }}
            className='h-20 w-20 cursor-pointer rounded-xl hover:brightness-50'
            src='/spiral.png'
            alt='img'
          />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <CustomSlider
          value={numSamples}
          setValue={setNumSamples}
          text1='Number of samples: '
          min={10}
          max={500}
          defval={10}
          step={10}
        />
        <CustomSlider
          value={noise}
          setValue={setNoise}
          text1='Noise: '
          min={0}
          max={0.5}
          defval={0}
          step={0.02}
        />
        <CustomSlider
          value={batchSize}
          setValue={setBatchSize}
          text1='Batch size: '
          min={1}
          max={30}
          defval={1}
          step={1}
        />
        <Button
          onClick={() => {
            setUpdater(!updater);
          }}
          className='w-[170px] rounded-full bg-indigo-800'
        >
          Regenerate
        </Button>
      </div>
    </div>
  );
}
