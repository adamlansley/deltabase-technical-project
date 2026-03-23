import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

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

const fetchReport = async (reportId: string) => {
  return new Promise<Report>((res) => {
    setTimeout(() => {
      res({
        title: `Strategy vs Culture Alignment ${reportId}`,
        description: 'Generated for peer set comparison',
        companies: [
          { name: 'Virgin Media O2' },
          { name: 'Vodafone Group Plc' },
          { name: 'BT Group' },
        ],
        tileDefinitions: [
          {
            type: 'textual',
            title: 'Executive Summary',
            content:
              'This Strategy vs Culture Alignment provides comprehensive analysis across 3 companies: Virgin Media O2, Vodafone Group Plc, and BT Group. The report delivers actionable insights through data-driven analysis, enabling strategic decision-making and performance optimisation',
          },
          {
            type: 'textual',
            title: 'Overview',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat pellentesque ante pulvinar faucibus. Nunc sodales eget libero nec placerat. Sed eu libero quam. Phasellus tincidunt, arcu volutpat pretium imperdiet, neque felis aliquam sem, eget ornare lacus nisl ac arcu. Vivamus nulla neque, tincidunt sed consectetur eget, facilisis eu arcu.',
          },
          {
            type: 'chart',
            chartType: 'bar',
            title: 'Default Bar Chart',
            dataSource: 'bar-chart-data-source',
          },
          {
            type: 'chart',
            chartType: 'pie',
            title: 'Default Pie Chart',
            description: 'This time with a description',
            dataSource: 'pie-data-source',
          },
        ],
      });
    }, 3000);
  });
};

export const reportQuery = <TData = Report>(
  reportId: string,
  select?: (data: Report) => TData,
) =>
  queryOptions({
    queryKey: reportQueryKeys.id(reportId),
    queryFn: () => fetchReport(reportId),
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

export const reportQueryKeys = {
  all: ['report'] as const,
  ids: () => [...reportQueryKeys.all, 'id'] as const,
  id: (id: string) => [...reportQueryKeys.ids(), id] as const,
};
