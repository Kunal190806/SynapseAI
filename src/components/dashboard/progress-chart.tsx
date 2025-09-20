'use client';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const chartData = [
  { project: 'Phoenix', progress: 95 },
  { project: 'Nova', progress: 45 },
  { project: 'QuantumLeap', progress: 78 },
  { project: 'Orion', progress: 60 },
  { project: 'Helios', progress: 25 },
  { project: 'Vega', progress: 89 },
];

const chartConfig = {
  progress: {
    label: 'Progress',
    color: 'hsl(var(--primary))',
  },
};

export default function ProgressChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <BarChart data={chartData} layout="vertical" margin={{ left: -10 }}>
        <XAxis type="number" hide />
        <YAxis
          dataKey="project"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={80}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="progress" fill="var(--color-progress)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
