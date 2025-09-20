'use client';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

const chartData = [
  { month: 'Jan', alignment: 82 },
  { month: 'Feb', alignment: 85 },
  { month: 'Mar', alignment: 83 },
  { month: 'Apr', alignment: 88 },
  { month: 'May', alignment: 89 },
  { month: 'Jun', alignment: 92 },
];

const chartConfig = {
  alignment: {
    label: 'Alignment Score',
    color: 'hsl(var(--accent))',
  },
};

export default function AlignmentChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[250px] w-full">
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={[75, 100]}
          tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Line
          dataKey="alignment"
          type="monotone"
          stroke="var(--color-alignment)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
