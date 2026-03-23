import { create } from 'zustand';
import type { AnyTile, Company } from '@/api/report/queries/useReportQuery.ts';

type ReportStoreState = {
  title: string;
  description?: string;
  tileDefinitions: AnyTile[];
  companies: Company[];
};

type ReportStoreActions = {
  setTitle: (newTitle: ReportStore['title']) => void;
  setDescription: (newDescription: ReportStore['description']) => void;

  setTileDefinitions: (tiles: AnyTile[]) => void;
  insertTileDefinition: (tile: AnyTile, index: number) => void;
  appendTileDefinition: (tile: AnyTile) => void;
  prependTileDefinition: (tile: AnyTile) => void;

  setCompanies: (tiles: Company[]) => void;
};

type ReportStore = ReportStoreState & ReportStoreActions;

export const useReportStore = create<ReportStore>()((set) => ({
  title: 'New Report Title',
  description: 'New Report Description',
  tileDefinitions: [],
  companies: [],
  setTitle: (newTitle: ReportStore['title']) => set({ title: newTitle }),
  setDescription: (newDescription: ReportStore['description']) =>
    set({ description: newDescription }),
  setTileDefinitions: (tiles: AnyTile[]) => set({ tileDefinitions: tiles }),
  insertTileDefinition: (tile: AnyTile, index: number) =>
    set((state) => ({
      tileDefinitions: state.tileDefinitions.splice(index, 0, tile),
    })),
  appendTileDefinition: (tile: AnyTile) =>
    set((state) => ({
      tileDefinitions: state.tileDefinitions.splice(
        state.tileDefinitions.length,
        0,
        tile,
      ),
    })),
  prependTileDefinition: (tile: AnyTile) =>
    set((state) => ({
      tileDefinitions: state.tileDefinitions.splice(0, 0, tile),
    })),
  setCompanies: (newCompanies: Company[]) => set({ companies: newCompanies }),
}));
