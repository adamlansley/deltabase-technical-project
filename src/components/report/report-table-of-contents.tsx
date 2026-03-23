import type { AnyTile } from '@/queries/report/useReportQuery.ts';
import { Card, CardContent } from '@/components/ui/card.tsx';

type ReportTableOfContentsProps = {
  tileDefinitions: AnyTile[];
};

export const tileTitleToHtmlId = (title: string) =>
  title.toLowerCase().replaceAll(/\s+/g, '-');

export const ReportTableOfContents = ({
  tileDefinitions,
}: ReportTableOfContentsProps) => {
  return (
    <Card className="basis-xl h-fit sticky top-24">
      <CardContent>
        <nav className="flex flex-col gap-4">
          <h3>Contents</h3>
          {tileDefinitions.length > 0 && (
            <ol className="text-sm">
              {tileDefinitions.map((tile) => (
                <li className="cursor-pointer py-2">
                  <a href={`#${tileTitleToHtmlId(tile.title)}`}>{tile.title}</a>
                </li>
              ))}
            </ol>
          )}
        </nav>
      </CardContent>
    </Card>
  );
};
