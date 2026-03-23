import { Card, CardContent } from '@/components/ui/card.tsx';
import { LoadingSpinner } from '@/components/ui/loading-spinner.tsx';

export const ReportLoading = () => {
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
}