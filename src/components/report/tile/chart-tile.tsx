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
import { useChartDataQuery } from '@/queries/report/useChartDataQuery.ts';
import { LoadingSpinner } from '@/components/ui/loading-spinner.tsx';

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

type ChartTileContentProps = {
  isError: boolean;
  data: any; // @TODO: This would need to be typed better
  tileDefinition: ChartTileDefinition;
};

const ChartTileContent = ({
  tileDefinition,
  isError,
  data,
}: ChartTileContentProps) => {
  if (data) {
    return mapChartDefinitionToComponent(tileDefinition);
  }

  if (isError) {
    return 'Error. Unable to load chart';
  }

  return <LoadingSpinner className="my-16" size="xl" />;
};

type ChartTileProps = {
  tileDefinition: ChartTileDefinition;
};

export const ChartTile = ({ tileDefinition }: ChartTileProps) => {
  const { isFetching, isLoading, isError, data } = useChartDataQuery(
    tileDefinition.dataSource,
  );

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          {tileDefinition.title && (
            <CardTitle>{tileDefinition.title}</CardTitle>
          )}
          {tileDefinition.description && (
            <CardDescription>{tileDefinition.description}</CardDescription>
          )}
        </div>
        {isFetching && !isLoading && <LoadingSpinner size="sm" />}
      </CardHeader>
      <CardContent>
        <ChartTileContent
          data={data}
          isError={isError}
          tileDefinition={tileDefinition}
        />
      </CardContent>
    </Card>
  );
};
