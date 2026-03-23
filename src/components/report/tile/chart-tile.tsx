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
import {
  type ChartData,
  useChartDataQuery,
} from '@/queries/report/useChartDataQuery.ts';
import { LoadingSpinner } from '@/components/ui/loading-spinner.tsx';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert.tsx';
import { CircleXIcon, InfoIcon } from 'lucide-react';

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
  data?: ChartData;
  tileDefinition: ChartTileDefinition;
};

const ChartTileContent = ({
  tileDefinition,
  isError,
  data,
}: ChartTileContentProps) => {
  if (data) {
    return (
      <div className="flex flex-col gap-4">
        {data.status === 'warning' && (
          <Alert variant="warning">
            <InfoIcon />
            <AlertTitle>Low confidence data</AlertTitle>
            <AlertDescription>{data.warning}</AlertDescription>
          </Alert>
        )}
        {mapChartDefinitionToComponent(tileDefinition)}
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <CircleXIcon />
        <AlertTitle>Unable to load chart</AlertTitle>
        <AlertDescription>
          There was an error loading this chart
        </AlertDescription>
      </Alert>
    );
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
        <div className="flex flex-col gap-2 min-h-8">
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
