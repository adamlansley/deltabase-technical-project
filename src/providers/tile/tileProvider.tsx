import { useMemo, useState } from 'react';
import type { PropsWithChildren } from 'react';

import { TileContext } from '@/providers/tile/tileContext.ts';
import type { TileStatus } from '@/providers/tile/tileContext.ts';

type TileProviderProps = PropsWithChildren;

export function TileProvider({ children }: TileProviderProps) {
  const [status, setStatus] = useState<TileStatus>('loading');

  const value = useMemo(() => ({ status, setStatus }), [status, setStatus]);

  return <TileContext.Provider value={value}>{children}</TileContext.Provider>;
}
