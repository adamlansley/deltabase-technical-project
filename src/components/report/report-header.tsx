import {
  ArrowLeftIcon,
  DownloadIcon,
  PrinterIcon,
  SaveIcon,
} from 'lucide-react';
import { Button } from '@/components/form/button/button.tsx';
import { ReportCompany } from '@/components/report/report-company.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { useReportStore } from '@/stores/report-store.ts';
import { LoadingSpinner } from '@/components/ui/loading-spinner.tsx';
import { useShallow } from 'zustand/react/shallow';

const ReportSavingButton = () => {
  const isSaving = useReportStore((s) => s.isSaving);

  return (
    <Button variant="secondary">
      {isSaving ? (
        <>
          <LoadingSpinner /> Saving
        </>
      ) : (
        <>
          <SaveIcon /> Save
        </>
      )}
    </Button>
  );
};

type ReportHeaderProps = {};

export const ReportHeader = ({}: ReportHeaderProps) => {
  const { title, description, companies } = useReportStore(
    useShallow((state) => ({
      title: state.title,
      description: state.description,
      companies: state.companies,
    })),
  );

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <Button variant="ghost">
            <ArrowLeftIcon /> <span>Back</span>
          </Button>
          <div className="flex flex-col grow gap-2">
            <h2>{title}</h2>
            {description && (
              <span className="text-sm opacity-65 font-light">
                {description}
              </span>
            )}
          </div>
          <div className="flex flex-row gap-2">
            <ReportSavingButton />

            <Button variant="secondary">
              <PrinterIcon /> Print
            </Button>
            <Button variant="default">
              <DownloadIcon /> Export
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-2 text-xs mx-auto md:mx-0">
          {companies.map((company) => (
            <ReportCompany
              key={company.name}
              name={company.name}
              imageSrc={company.imageSrc}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
