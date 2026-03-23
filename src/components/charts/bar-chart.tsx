import {
  Bar as RechartsBar,
  BarChart as RechartsBarChart,
  CartesianGrid as RechartsCartesianGrid,
  XAxis as RechartsXAxis,
  Tooltip as RechartsTooltip,
} from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from '@/components/charts/chart.tsx';

import type { ChartConfig } from '@/components/charts/chart.tsx';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#2563eb',
  },
  mobile: {
    label: 'Mobile',
    color: '#60a5fa',
  },
} satisfies ChartConfig;

export const BarChart = () => {
  return (
    <ChartContainer config={chartConfig} className="min-h-50 w-full">
      <RechartsBarChart accessibilityLayer data={chartData}>
        <RechartsCartesianGrid vertical={false} />
        <RechartsTooltip content={<ChartTooltipContent hideLabel />} />
        <RechartsXAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <RechartsBar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <RechartsBar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        <ChartLegend content={<ChartLegendContent />} />
      </RechartsBarChart>
    </ChartContainer>
  );
};
