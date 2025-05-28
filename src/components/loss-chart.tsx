import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import { usePlaygroundContext } from '@/lib/playground-context';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export function LossChart() {
  const { losses, setLosses } = usePlaygroundContext();

  return (
    <div className='flex flex-col gap-3'>
      <ChartContainer config={chartConfig}>
        <LineChart
          accessibilityLayer
          data={losses.map((loss, index) => ({
            epoch: index + 1,
            loss
          }))}
          margin={{
            left: 12,
            right: 12
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey='epoch'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => String(value)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Line dataKey='loss' type='natural' strokeWidth={2} dot={false} />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
