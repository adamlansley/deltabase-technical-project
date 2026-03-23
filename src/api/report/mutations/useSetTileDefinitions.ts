import type { AnyTile } from '@/api/report/queries/useReportQuery.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportQueryKeys } from '@/api/report/keys.ts';
import { DUMMY_REPORT_DATA } from '@/api/report/dummyData.ts';
import { cloneDeep } from 'lodash-es';
import { useReportStore } from '@/stores/report-store.ts';

export const useSetTileDefinitions = (id: string) => {
  const queryClient = useQueryClient();
  const setIsReportSaving = useReportStore((s) => s.setIsSaving);

  return useMutation({
    mutationFn: async (tileDefinitions: AnyTile[]) => {
      // This is all a little gross as I don't have a BE setup.
      const reportClone = cloneDeep(DUMMY_REPORT_DATA);
      reportClone.tileDefinitions = tileDefinitions;

      return new Promise((res) => {
        setTimeout(() => {
          res(reportClone);
        }, 3000);
      });
    },
    onMutate: () => {
      setIsReportSaving(true);
    },
    onSuccess: (newReport) => {
      queryClient.setQueryData(reportQueryKeys.id(id), newReport);
    },
    onSettled: () => {
      setIsReportSaving(false);
    },
  });
};
