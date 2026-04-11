import { createContext, useContext } from 'react';
import type { FeatureFlags } from './types';

export type FlagsState = {
  flags: FeatureFlags;
};

export const FlagsContext = createContext<FlagsState | null>(null);

export function useFlags(): FlagsState {
  const ctx = useContext(FlagsContext);
  if (!ctx) throw new Error('useFlags must be used within FlagsProvider');
  return ctx;
}
