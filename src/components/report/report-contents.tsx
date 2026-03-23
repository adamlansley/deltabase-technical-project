import type { AnyTile } from '@/queries/report/useReportQuery.ts';
import { TextualTile } from '@/components/report/tile/textual-tile.tsx';
import { ChartTile } from '@/components/report/tile/chart-tile.tsx';
import { LayoutTile } from '@/components/report/tile/layout-tile.tsx';
import { useMemo } from 'react';
import { tileTitleToHtmlId } from '@/components/report/report-table-of-contents.tsx';

type ReportContentsProps = {
  tileDefinitions: AnyTile[];
};

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

export const ReportContents = ({ tileDefinitions }: ReportContentsProps) => {
  const tiles = useMemo(
    () =>
      tileDefinitions.map((tile) => (
        <div id={tileTitleToHtmlId(tile.title)}>
          {mapTileDefinitionToComponent(tile)}
        </div>
      )),
    [tileDefinitions],
  );

  return <div className="flex flex-col gap-12">{tiles}</div>;
};
