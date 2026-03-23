import type { TextualTileDefinition } from '@/queries/report/useReportQuery.ts';

type TextualTileProps = {
  tileDefinition: TextualTileDefinition;
};

export const TextualTile = ({ tileDefinition }: TextualTileProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h3 className="text-2xl font-bold">{tileDefinition.title}</h3>
      <span>{tileDefinition.content}</span>
    </section>
  );
};
