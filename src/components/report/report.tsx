import { useSuspenseReportQuery } from '@/queries/report/useReportQuery.ts';
import { ReportHeader } from '@/components/report/report-header.tsx';
import { ReportTableOfContents } from '@/components/report/report-table-of-contents.tsx';
import { ReportContents } from '@/components/report/report-contents.tsx';

type ReportProps = {
  id: string;
};

export const Report = ({ id }: ReportProps) => {
  const { data } = useSuspenseReportQuery(id);

  return (
    <section className="flex flex-col flex-wrap gap-8">
      <ReportHeader
        title={data.title}
        description={data.description}
        companies={data.companies}
      />
      <div className="flex flex-row gap-8">
        <ReportTableOfContents tileDefinitions={data.tileDefinitions} />
        <main>
          <ReportContents tileDefinitions={data.tileDefinitions} />
        </main>
      </div>
    </section>
  );
};
