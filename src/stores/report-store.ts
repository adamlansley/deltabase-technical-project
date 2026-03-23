import { create } from 'zustand';
import type { AnyTile, Company } from '@/api/report/queries/useReportQuery.ts';

type ReportStoreState = {
  hasLoaded: boolean;
  isSaving: boolean;
  title: string;
  description?: string;
  tileDefinitions: AnyTile[];
  companies: Company[];
};

type ReportStoreActions = {
  setHasLoaded: (hasLoaded: ReportStoreState['hasLoaded']) => void;
  setIsSaving: (isSaving: ReportStoreState['isSaving']) => void;
  setTitle: (newTitle: ReportStoreState['title']) => void;
  setDescription: (newDescription: ReportStoreState['description']) => void;
  setTileDefinitions: (
    newTileDefinitions: ReportStoreState['tileDefinitions'],
  ) => void;
  insertTileDefinition: (
    newTileDefinitions: ReportStoreState['tileDefinitions'][number],
    index: number,
  ) => void;
  setCompanies: (newCompanies: ReportStoreState['companies']) => void;
};

type ReportStore = ReportStoreState & ReportStoreActions;

export const useReportStore = create<ReportStore>()((set) => ({
  hasLoaded: false,
  isSaving: false,
  title: '',
  description: '',
  tileDefinitions: [],
  companies: [],

  setHasLoaded: (hasLoaded: ReportStoreState['hasLoaded']) =>
    set({ hasLoaded }),
  setIsSaving: (isSaving: ReportStoreState['isSaving']) => set({ isSaving }),
  setTitle: (newTitle: ReportStoreState['title']) => set({ title: newTitle }),
  setDescription: (newDescription: ReportStoreState['description']) =>
    set({ description: newDescription }),
  setTileDefinitions: (
    newTileDefinitions: ReportStoreState['tileDefinitions'],
  ) => set({ tileDefinitions: newTileDefinitions }),
  insertTileDefinition: (
    newTileDefinition: ReportStoreState['tileDefinitions'][number],
    index: number,
  ) =>
    set((state) => ({
      tileDefinitions: [
        ...state.tileDefinitions.slice(0, index),
        newTileDefinition,
        ...state.tileDefinitions.slice(index),
      ],
    })),
  setCompanies: (newCompanies: ReportStoreState['companies']) =>
    set({ companies: newCompanies }),
}));
