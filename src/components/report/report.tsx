import { ReportHeader } from '@/components/report/report-header.tsx';
import { ReportTableOfContents } from '@/components/report/report-table-of-contents.tsx';
import { ReportContents } from '@/components/report/report-contents.tsx';

type ReportProps = {};

export const Report = ({}: ReportProps) => {
  return (
    <section className="flex flex-col flex-wrap gap-8">
      <ReportHeader />
      <div className="flex flex-col lg:flex-row gap-8">
        <ReportTableOfContents />
        <main>
          <ReportContents />
        </main>
      </div>
    </section>
  );
};
