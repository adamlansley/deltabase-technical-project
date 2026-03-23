import { useQuery } from '@tanstack/react-query';
import { chartDataQueryKeys } from '@/api/report/keys.ts';

type ChartStatusSuccess = {
  status: 'success';
};

type ChartStatusWarning = {
  status: 'warning';
  warning: string;
};

type ChartStatus = ChartStatusSuccess | ChartStatusWarning;

export type ChartData = { dataSource: string } & ChartStatus;

const fetchChartData = async (dataSource: string) => {
  const random = Math.random() * 3000;
  return new Promise<ChartData>((res, rej) => {
    setTimeout(() => {
      if (random < 1000) {
        res({ status: 'success', dataSource });
      } else if (random < 2000) {
        res({
          status: 'warning',
          warning: 'Some warning explaining data concerns',
          dataSource,
        });
      } else {
        rej();
      }
    }, random);
  });
};

export const chartDataQuery = (dataSource: string) => ({
  queryKey: chartDataQueryKeys.source(dataSource),
  queryFn: () => fetchChartData(dataSource),
  retry: false,
});

export const useChartDataQuery = (dataSource: string) => {
  return useQuery(chartDataQuery(dataSource));
};
