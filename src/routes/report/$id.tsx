import { createFileRoute, useParams } from '@tanstack/react-router';
import { reportQuery } from '@/queries/report/useReportQuery.ts';
import { Report } from '@/components/report/report.tsx';

export const Route = createFileRoute('/report/$id')({
  loader: ({ context, params }) => {
    context.queryClient.fetchQuery(reportQuery(params.id));
  },
  component: () => {
    const { id } = useParams({ from: '/report/$id' });
    return (
      <section className="page-wrap px-4 pb-8 pt-14">
        <Report id={id} />
      </section>
    );
  },
  pendingComponent: () => {
    return (
      <main className="page-wrap px-4 pb-8 pt-14">Loading your report...</main>
    );
  },
  errorComponent: () => {
    return (
      <main className="page-wrap px-4 pb-8 pt-14">
        Unable to load your report :(
      </main>
    );
  },
});
