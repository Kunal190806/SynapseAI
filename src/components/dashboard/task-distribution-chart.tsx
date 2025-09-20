'use client';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { RadialBarChart, RadialBar, LabelList } from 'recharts';

const chartData = [
  { goal: 'Growth', tasks: 120, fill: 'var(--color-growth)' },
  { goal: 'Efficiency', tasks: 90, fill: 'var(--color-efficiency)' },
  { goal: 'Innovation', tasks: 75, fill: 'var(--color-innovation)' },
  { goal: 'Stability', tasks: 60, fill: 'var(--color-stability)' },
];

const chartConfig = {
  tasks: {
    label: 'Tasks',
  },
  growth: {
    label: 'Growth',
    color: 'hsl(var(--chart-1))',
  },
  efficiency: {
    label: 'Efficiency',
    color: 'hsl(var(--chart-2))',
  },
  innovation: {
    label: 'Innovation',
    color: 'hsl(var(--chart-4))',
  },
  stability: {
    label: 'Stability',
    color: 'hsl(var(--chart-5))',
  },
};

export default function TaskDistributionChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[250px]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={-90}
        endAngle={360}
        innerRadius={30}
        outerRadius={110}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="goal" />}
        />
        <RadialBar dataKey="tasks" background>
          <LabelList
            position="insideStart"
            dataKey="goal"
            className="fill-white text-xs capitalize"
            fontSize={11}
          />
        </RadialBar>
        <ChartLegend content={<ChartLegendContent nameKey="goal" />} />
      </RadialBarChart>
    </ChartContainer>
  );
}
