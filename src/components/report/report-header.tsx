import {
  ArrowLeftIcon,
  DownloadIcon,
  PrinterIcon,
  SaveIcon,
} from 'lucide-react';
import { Button } from '@/components/form/button/button.tsx';
import { ReportCompany } from '@/components/report/report-company.tsx';
import { Card, CardContent } from '@/components/ui/card.tsx';
import { useSuspenseReportQuery } from '@/api/report/queries/useReportQuery.ts';
import { useParams } from '@tanstack/react-router';

type ReportHeaderProps = {};

export const ReportHeader = ({}: ReportHeaderProps) => {
  const { id } = useParams({ from: '/report/$id' });

  const { data: report } = useSuspenseReportQuery(id, (data) => ({
    title: data.title,
    description: data.description,
    companies: data.companies,
  }));

  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-row gap-8">
          <Button variant="ghost">
            <ArrowLeftIcon /> <span>Back</span>
          </Button>
          <div className="flex flex-col grow gap-2">
            <h2>{report.title}</h2>
            {report.description && (
              <span className="text-sm opacity-65 font-light">
                {report.description}
              </span>
            )}
          </div>
          <div className="flex flex-row gap-2">
            <Button variant="secondary">
              <SaveIcon /> Save
            </Button>
            <Button variant="secondary">
              <PrinterIcon /> Print
            </Button>
            <Button variant="default">
              <DownloadIcon /> Export
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-2 text-xs">
          {report.companies.map((company) => (
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
