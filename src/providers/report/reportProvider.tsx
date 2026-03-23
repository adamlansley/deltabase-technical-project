import { type PropsWithChildren, useEffect } from 'react';
import { ReportContext } from './reportContext';
import { useSuspenseReportQuery } from '@/api/report/queries/useReportQuery.ts';
import { useParams } from '@tanstack/react-router';
import { useReportStore } from '@/stores/report-store.ts';
import { useShallow } from 'zustand/react/shallow';
import { ReportLoading } from '@/routes/report/-components/report-loading.tsx';

type ReportProviderProps = {} & PropsWithChildren;

export function ReportProvider({ children }: ReportProviderProps) {
  const { id } = useParams({ from: '/report/$id' });
  const { data } = useSuspenseReportQuery(id);

  const {
    hasLoaded,
    setHasLoaded,
    setTitle,
    setDescription,
    setTileDefinitions,
    setCompanies,
  } = useReportStore(
    useShallow((state) => ({
      hasLoaded: state.hasLoaded,
      setHasLoaded: state.setHasLoaded,
      setTitle: state.setTitle,
      setDescription: state.setDescription,
      setTileDefinitions: state.setTileDefinitions,
      setCompanies: state.setCompanies,
    })),
  );

  useEffect(() => {
    if (hasLoaded) {
      return;
    }

    setTitle(data.title);
    setDescription(data.description);
    setTileDefinitions(data.tileDefinitions);
    setCompanies(data.companies);
    setHasLoaded(true);
  }, []);

  if (!hasLoaded) {
    return <ReportLoading />;
  }

  return <ReportContext.Provider value={{}}>{children}</ReportContext.Provider>;
}
