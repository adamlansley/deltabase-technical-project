import { createFileRoute, useParams } from '@tanstack/react-router';
import { reportQuery } from '@/queries/report/useReportQuery.ts';
import { Report } from '@/components/report/report.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { LoadingSpinner } from '@/components/ui/loading-spinner.tsx';
import { BugIcon } from 'lucide-react';

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
      <main className="page-wrap px-4 pb-8 pt-14">
        <Card>
          <CardContent className="text-center flex flex-col gap-4">
            <h2 className="font-bold text-4xl ">Loading your report</h2>
            <span>Fetching the lastest version of your report</span>
            <LoadingSpinner className="my-16" size="xl" />
          </CardContent>
        </Card>
      </main>
    );
  },
  errorComponent: () => {
    return (
      <main className="page-wrap px-4 pb-8 pt-14">
        <Card>
          <CardContent className="text-center flex flex-col gap-4 items-center justify-center">
            <h2 className="font-bold text-4xl ">
              An error occurred when loading your report
            </h2>
            <span>
              Please try again, and if the problem continues, contact support
              with your report URL.
            </span>
            <BugIcon className="my-16 h-24 w-24" />
          </CardContent>
        </Card>
      </main>
    );
  },
});
