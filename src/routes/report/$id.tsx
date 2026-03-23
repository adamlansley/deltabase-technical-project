import { createFileRoute } from '@tanstack/react-router';
import { reportQuery } from '@/api/report/queries/useReportQuery.ts';
import { Report } from '@/components/report/report.tsx';
import { ReportError } from '@/routes/report/-components/report-error.tsx';
import { ReportLoading } from '@/routes/report/-components/report-loading.tsx';

export const Route = createFileRoute('/report/$id')({
  beforeLoad: ({ context, params }) => {
    context.queryClient.ensureQueryData(reportQuery(params.id));
  },
  component: () => {
    return (
      <section className="page-wrap px-4 pb-8 pt-14">
        <Report />
      </section>
    );
  },
  pendingComponent: () => {
    return <ReportLoading />;
  },
  errorComponent: () => {
    return <ReportError />;
  },
});
