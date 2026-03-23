import {
  type AnyTile,
  type LayoutTileDefinition,
} from '@/api/report/queries/useReportQuery.ts';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { useMemo } from 'react';
import { useReportStore } from '@/stores/report-store.ts';

type ReportTableOfContentsProps = {};

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

export const ReportTableOfContents = ({}: ReportTableOfContentsProps) => {
  const tileDefinitions = useReportStore((state) => state.tileDefinitions);

  const onlyContentTiles = useMemo(
    () => tileDefinitions.filter(filterOnlyContentBasedTile),
    [tileDefinitions],
  );

  const hasContent = onlyContentTiles.length > 0;

  return (
    <Card className="lg:basis-xl lg:h-fit lg:sticky top-24">
      <CardHeader>
        <h3>Contents</h3>
      </CardHeader>
      <CardContent className="overflow-auto max-h-96">
        <nav className="flex flex-col gap-4 ">
          {hasContent ? (
            <ol className="text-sm">
              {onlyContentTiles.map((tile) => (
                <li
                  key={tileTitleToHtmlId(tile)}
                  className="cursor-pointer py-2"
                >
                  <a href={`#${tileTitleToHtmlId(tile)}`}>{tile.title}</a>
                </li>
              ))}
            </ol>
          ) : (
            <span>No content in report</span>
          )}
        </nav>
      </CardContent>
    </Card>
  );
};
