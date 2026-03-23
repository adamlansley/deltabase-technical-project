import { Button } from '@/components/form/button/button.tsx';
import { ChartColumnIcon, Grid2X2Icon, TypeIcon } from 'lucide-react';
import {
  type TileToInsert,
  useAddTile,
} from '@/api/report/mutations/useAddTile.ts';
import { useParams } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useReportStore } from '@/stores/report-store.ts';

type ReportAddTileProps = {
  index: number;
};

export const ReportAddTile = ({ index }: ReportAddTileProps) => {
  const { id } = useParams({ from: '/report/$id' });
  const insertTileDefinition = useReportStore((s) => s.insertTileDefinition);
  const addTile = useAddTile(id);

  const onAddTile = useCallback(
    (newTile: TileToInsert) => {
      insertTileDefinition(newTile.tileDefinition, newTile.index);
      addTile.mutate(newTile);
    },
    [insertTileDefinition, addTile],
  );

  return (
    <div className="grid grid-cols-2 gap-2 ">
      <Button
        className="flex flex-col gap-2 w-full min-h-fit aspect-square"
        onClick={() =>
          onAddTile({
            index,
            tileDefinition: {
              type: 'chart',
              chartType: 'bar',
              dataSource: 'bar-chart-data-source',
              title: 'New Bar Chart',
            },
          })
        }
      >
        <ChartColumnIcon className="size-1/4" /> Add Visualisation
      </Button>
      <Button
        className="flex flex-col gap-2 w-full min-h-fit aspect-square"
        onClick={() =>
          onAddTile({
            index,
            tileDefinition: {
              type: 'textual',
              title: 'New Text Tile',
              content: 'Next Text Content',
            },
          })
        }
      >
        <TypeIcon className="size-1/4" />
        Add Annotation
      </Button>
      <Button
        className="flex flex-col gap-2 w-full min-h-fit aspect-square"
        onClick={() =>
          onAddTile({
            index,
            tileDefinition: {
              type: 'layout',
            },
          })
        }
      >
        <Grid2X2Icon className="size-1/4" />
        Add Layout
      </Button>
    </div>
  );
};
