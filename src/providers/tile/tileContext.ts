import { createContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export type TileStatus = 'loading' | 'success' | 'error';

type TileContextMembers = {
  status: TileStatus;
  setStatus: Dispatch<SetStateAction<TileStatus>>;
};

export const TileContext = createContext<TileContextMembers | null>(null);
