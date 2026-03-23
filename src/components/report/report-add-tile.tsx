import { Button } from '@/components/form/button/button.tsx';
import { ChartColumnIcon, Grid2X2Icon, TypeIcon } from 'lucide-react';
import { useSetTileDefinitions } from '@/api/report/mutations/useSetTileDefinitions.ts';
import { useParams } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useReportStore } from '@/stores/report-store.ts';
import { useShallow } from 'zustand/react/shallow';
import type { AnyTile } from '@/api/report/queries/useReportQuery.ts';
import { cloneDeep } from 'lodash-es';

export type TileToInsert = {
  index: number;
  tileDefinition: AnyTile;
};

type ReportAddTileProps = {
  index: number;
};

export const ReportAddTile = ({ index }: ReportAddTileProps) => {
  const { id } = useParams({ from: '/report/$id' });
  const { tileDefinitions, insertTileDefinition } = useReportStore(
    useShallow((s) => ({
      tileDefinitions: s.tileDefinitions,
      insertTileDefinition: s.insertTileDefinition,
    })),
  );
  const setTileDefinitions = useSetTileDefinitions(id);

  const onAddTile = useCallback(
    (newTile: TileToInsert) => {
      insertTileDefinition(newTile.tileDefinition, newTile.index);

      const newTileDefinitions = cloneDeep(tileDefinitions);

      newTileDefinitions.splice(newTile.index, 0, newTile.tileDefinition);
      setTileDefinitions.mutate(newTileDefinitions);
    },
    [insertTileDefinition, setTileDefinitions],
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
              title: 'New Bar Chart' + tileDefinitions.length,
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
              title: 'New Text Tile' + tileDefinitions.length,
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
