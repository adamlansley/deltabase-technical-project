import { useMemo } from 'react';
import { Tile } from '@/components/report/tile/tile.tsx';
import { Button } from '@/components/form/button/button.tsx';
import { CirclePlusIcon } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover.tsx';
import { ReportAddTile } from '@/components/report/report-add-tile.tsx';
import { useReportStore } from '@/stores/report-store.ts';

type ReportContentsProps = {};

export const ReportContents = ({}: ReportContentsProps) => {
  const tileDefinitions = useReportStore((state) => state.tileDefinitions);

  const tiles = useMemo(
    () =>
      tileDefinitions.map((tile, index) => (
        <div key={tile.type + index}>
          <Tile tile={tile} />
          <Popover>
            <PopoverTrigger asChild>
              <Button className="w-full mt-4" variant="ghost">
                <CirclePlusIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <ReportAddTile index={index + 1} />
            </PopoverContent>
          </Popover>
        </div>
      )),
    [tileDefinitions],
  );

  return <div className="flex flex-col gap-4">{tiles}</div>;
};
