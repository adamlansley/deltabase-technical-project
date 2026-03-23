import type { AnyTile } from '@/api/report/queries/useReportQuery.ts';
import { tileTitleToHtmlId } from '@/components/report/report-table-of-contents.tsx';
import { TextualTile } from '@/components/report/tile/textual-tile.tsx';
import { ChartTile } from '@/components/report/tile/chart-tile.tsx';
import { LayoutTile } from '@/components/report/tile/layout-tile.tsx';

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

type TileProps = {
  tile: AnyTile;
};

export const Tile = ({ tile }: TileProps) => {
  return (
    <div key={tileTitleToHtmlId(tile)} id={tileTitleToHtmlId(tile)}>
      <div>{mapTileDefinitionToComponent(tile)}</div>
    </div>
  );
};
