'use client';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, Cell } from 'recharts';

const chartData = [
  { project: 'Phoenix', progress: 95, fill: 'var(--color-chart-1)' },
  { project: 'Nova', progress: 45, fill: 'var(--color-chart-2)' },
  { project: 'QuantumLeap', progress: 78, fill: 'var(--color-chart-3)' },
  { project: 'Orion', progress: 60, fill: 'var(--color-chart-4)' },
  { project: 'Helios', progress: 25, fill: 'var(--color-chart-5)' },
  { project: 'Vega', progress: 89, fill: 'var(--color-chart-1)' },
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
        <Bar dataKey="progress" radius={4}>
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
