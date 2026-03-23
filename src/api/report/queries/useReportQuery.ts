import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { reportQueryKeys } from '@/api/report/keys.ts';
import { DUMMY_REPORT_DATA } from '@/api/report/dummy-data.ts';

type TileDescriptionDefinition = {
  title: string;
  description?: string;
};

type BarChartTileDefinition = {
  chartType: 'bar';
};

type PieChartTileDefinition = {
  chartType: 'pie';
};

type AnyChart = BarChartTileDefinition | PieChartTileDefinition;

export type ChartTileDefinition = TileDescriptionDefinition & {
  type: 'chart';
  dataSource: string;
} & AnyChart;

export type LayoutTileDefinition = {
  type: 'layout';
};

export type TextualTileDefinition = TileDescriptionDefinition & {
  type: 'textual';
  content: string;
};

export type AnyTile =
  | ChartTileDefinition
  | LayoutTileDefinition
  | TextualTileDefinition;

export type ReportOverview = {
  title: string;
  description?: string;
  companies: Company[];
};

export type Report = ReportOverview & {
  tileDefinitions: AnyTile[];
};

export type Company = {
  name: string;
  imageSrc?: string;
};

const fetchReport = async () => {
  return new Promise<Report>((res) => {
    setTimeout(() => {
      res(DUMMY_REPORT_DATA);
    }, 1500);
  });
};

export const reportQuery = <TData = Report>(
  reportId: string,
  select?: (data: Report) => TData,
) =>
  queryOptions({
    queryKey: reportQueryKeys.id(reportId),
    queryFn: () => fetchReport(),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    select,
  });

export const useSuspenseReportQuery = <TData = Report>(
  reportId: string,
  select?: (data: Report) => TData,
) => {
  return useSuspenseQuery(reportQuery(reportId, select));
};
