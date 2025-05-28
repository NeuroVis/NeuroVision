import { Slider } from '@/components/ui/slider';

export function CustomSlider({
  text1,
  text2,
  defval,
  max,
  min,
  step,
  value,
  setValue
}: {
  text1: string;
  text2?: string;
  defval: number;
  max: number;
  min: number;
  step: number;
  value: number;
  setValue: (value: number) => void;
}) {
  return (
    <div className='flex w-[180px] flex-col gap-2 text-wrap text-black'>
      <p className={'w-[160px] text-sm'}>
        {text1}
        <span>{value}</span>
        {text2}
      </p>
      <Slider
        defaultValue={[defval]}
        value={[value]}
        onValueChange={(values) => {
          setValue(values[0]);
        }}
        max={max}
        min={min}
        step={step}
        className='w-[180px]'
      ></Slider>
    </div>
  );
}
