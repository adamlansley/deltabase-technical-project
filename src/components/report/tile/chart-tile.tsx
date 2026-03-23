import type { ChartTileDefinition } from '@/queries/report/useReportQuery.ts';
import { BarChart } from '@/components/charts/bar-chart.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { PieChart } from '@/components/charts/pie-chart.tsx';

type ChartTileProps = {
  tileDefinition: ChartTileDefinition;
};

const mapChartDefinitionToComponent = (tile: ChartTileDefinition) => {
  switch (tile.chartType) {
    case 'bar':
      return <BarChart />;

    case 'pie':
      return <PieChart />;

    default:
      throw new Error(
        `Unknown chart type when mapping definition to component`,
      );
  }
};

export const ChartTile = ({ tileDefinition }: ChartTileProps) => {
  return (
    <Card>
      {(tileDefinition.title || tileDefinition.description) && (
        <CardHeader>
          {tileDefinition.title && (
            <CardTitle>{tileDefinition.title}</CardTitle>
          )}
          {tileDefinition.description && (
            <CardDescription>{tileDefinition.description}</CardDescription>
          )}
        </CardHeader>
      )}
      <CardContent>{mapChartDefinitionToComponent(tileDefinition)}</CardContent>
    </Card>
  );
};
