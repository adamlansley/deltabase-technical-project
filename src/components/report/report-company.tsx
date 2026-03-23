import type { Company } from '@/api/report/queries/useReportQuery.ts';

type ReportCompanyProps = Company;

export const ReportCompany = ({ name, imageSrc }: ReportCompanyProps) => {
  return (
    <div className="flex flex-row gap-2 border rounded-full px-2 py-1 items-center">
      <img className="size-3" alt={name} src={imageSrc} />
      <span>{name}</span>
    </div>
  );
};
