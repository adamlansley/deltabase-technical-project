import {
  type AnyTile,
  useSuspenseReportQuery,
} from '@/api/report/queries/useReportQuery.ts';
import { TextualTile } from '@/components/report/tile/textual-tile.tsx';
import { ChartTile } from '@/components/report/tile/chart-tile.tsx';
import { LayoutTile } from '@/components/report/tile/layout-tile.tsx';
import { useMemo } from 'react';
import { tileTitleToHtmlId } from '@/components/report/report-table-of-contents.tsx';
import { useParams } from '@tanstack/react-router';

type ReportContentsProps = {};

const mapTileDefinitionToComponent = (tile: AnyTile) => {
  switch (tile.type) {
    case 'textual':
      return <TextualTile tileDefinition={tile} />;

    case 'chart':
      return <ChartTile tileDefinition={tile} />;

    case 'layout':
      return <LayoutTile tileDefinition={tile} />;

    default:
      throw new Error(`Unknown tile type when mapping definition to component`);
  }
};

export const ReportContents = ({}: ReportContentsProps) => {
  const { id } = useParams({ from: '/report/$id' });

  const { data: tileDefinitions } = useSuspenseReportQuery(
    id,
    (data) => data.tileDefinitions,
  );

  const tiles = useMemo(
    () =>
      tileDefinitions.map((tile) => (
        <div key={tileTitleToHtmlId(tile)} id={tileTitleToHtmlId(tile)}>
          {mapTileDefinitionToComponent(tile)}
        </div>
      )),
    [tileDefinitions],
  );

  return <div className="flex flex-col gap-12">{tiles}</div>;
};
