import type {
  AnyTile,
  LayoutTileDefinition,
} from '@/queries/report/useReportQuery.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { useMemo } from 'react';

type ReportTableOfContentsProps = {
  tileDefinitions: AnyTile[];
};

export const tileTitleToHtmlId = (tile: AnyTile) => {
  if (tile.type === 'layout' || !('title' in tile)) {
    return undefined;
  }

  return tile.title.toLowerCase().replaceAll(/\s+/g, '-');
};

export const filterOnlyContentBasedTile = (
  tile: AnyTile,
): tile is Exclude<AnyTile, LayoutTileDefinition> => {
  return tile.type !== 'layout';
};

export const ReportTableOfContents = ({
  tileDefinitions,
}: ReportTableOfContentsProps) => {
  const tilesWithContent = useMemo(
    () => tileDefinitions.filter(filterOnlyContentBasedTile),
    [tileDefinitions],
  );

  return (
    <Card className="basis-xl h-fit sticky top-24">
      <CardContent>
        <nav className="flex flex-col gap-4">
          <h3>Contents</h3>
          {tileDefinitions.length > 0 && (
            <ol className="text-sm">
              {tilesWithContent.map((tile) => (
                <li
                  key={tileTitleToHtmlId(tile)}
                  className="cursor-pointer py-2"
                >
                  <a href={`#${tileTitleToHtmlId(tile)}`}>{tile.title}</a>
                </li>
              ))}
            </ol>
          )}
        </nav>
      </CardContent>
    </Card>
  );
};
