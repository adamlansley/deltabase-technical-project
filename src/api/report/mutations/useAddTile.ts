import type { AnyTile } from '@/api/report/queries/useReportQuery.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { reportQueryKeys } from '@/api/report/keys.ts';
import { DUMMY_REPORT_DATA } from '@/api/report/dummy-data.ts';
import { cloneDeep } from 'lodash-es';
import { useReportStore } from '@/stores/report-store.ts';

export type TileToInsert = {
  index: number;
  tileDefinition: AnyTile;
};

export const useAddTile = (id: string) => {
  const queryClient = useQueryClient();
  const setIsReportSaving = useReportStore((s) => s.setIsSaving);

  return useMutation({
    mutationFn: async ({ index, tileDefinition }: TileToInsert) => {
      // This is all a little gross as I don't have a BE setup.
      const reportClone = cloneDeep(DUMMY_REPORT_DATA);
      reportClone.tileDefinitions.splice(index, 0, tileDefinition);

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
      Object.assign(DUMMY_REPORT_DATA, newReport);
    },
    onSettled: () => {
      setIsReportSaving(false);
    },
  });
};
