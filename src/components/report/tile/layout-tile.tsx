import type { LayoutTileDefinition } from '@/queries/report/useReportQuery.ts';

type LayoutTileProps = {
  tileDefinition: LayoutTileDefinition;
};

export const LayoutTile = ({ tileDefinition }: LayoutTileProps) => {
  return <div>{tileDefinition.type}</div>;
};
