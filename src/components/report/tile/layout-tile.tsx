import type { LayoutTileDefinition } from '@/api/report/queries/useReportQuery.ts';

type LayoutTileProps = {
  tileDefinition: LayoutTileDefinition;
};

export const LayoutTile = ({ tileDefinition }: LayoutTileProps) => {
  return <div>{tileDefinition.type}</div>;
};
