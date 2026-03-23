export const reportQueryKeys = {
  all: ['report'] as const,
  ids: () => [...reportQueryKeys.all, 'id'] as const,
  id: (id: string) => [...reportQueryKeys.ids(), id] as const,
};

export const chartDataQueryKeys = {
  all: ['chart-data'] as const,
  sources: () => [...chartDataQueryKeys.all, 'source'] as const,
  source: (dataSource: string) =>
    [...chartDataQueryKeys.sources(), dataSource] as const,
};
