import { Card, CardContent } from '@/components/ui/card.tsx';
import { BugIcon } from 'lucide-react';

export const ReportError = () => {
  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <Card>
        <CardContent className="text-center flex flex-col gap-4 items-center justify-center">
          <h2 className="font-bold text-4xl ">
            An error occurred when loading your report
          </h2>
          <span>
            Please try again, and if the problem continues, contact support with
            your report URL.
          </span>
          <BugIcon className="my-16 h-24 w-24" />
        </CardContent>
      </Card>
    </main>
  );
}