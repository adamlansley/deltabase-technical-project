import { useQuery } from '@tanstack/react-query';

const fetchChartData = async (dataSource: string) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(dataSource);
    }, Math.random() * 3000);
  });
};

export const chartDataQuery = (dataSource: string) => ({
  queryKey: chartDataQueryKeys.source(dataSource),
  queryFn: () => fetchChartData(dataSource),
});

export const useChartDataQuery = (dataSource: string) => {
  return useQuery(chartDataQuery(dataSource));
};

export const chartDataQueryKeys = {
  all: ['chart-data'] as const,
  sources: () => [...chartDataQueryKeys.all, 'source'] as const,
  source: (dataSource: string) =>
    [...chartDataQueryKeys.sources(), dataSource] as const,
};
