import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenant } from '../tenant/TenantContext';
import { queryKeys } from '../cache/queryKeys';
import { DEFAULT_FLAGS } from './defaults';
import { flagsApi } from '../api/flagsApi';
import type { FeatureFlags } from './types';

export type FlagsState = {
  remoteFlags: FeatureFlags;
  effectiveFlags: FeatureFlags;
};

const FlagsContext = createContext<FlagsState | null>(null);

export function FlagsProvider({ children }: PropsWithChildren) {
  const { tenantId } = useTenant();

  const flagsQuery = useQuery({
    queryKey: queryKeys.tenant(tenantId).flags(),
    queryFn: async () => {
      const remote = await flagsApi.getForTenant(tenantId);
      return remote.flags ?? DEFAULT_FLAGS;
    },
  });

  const remoteFlags = flagsQuery.data ?? DEFAULT_FLAGS;

  const effectiveFlags = remoteFlags;

  const value = useMemo<FlagsState>(
    () => ({ remoteFlags, effectiveFlags }),
    [remoteFlags, effectiveFlags],
  );

  return <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>;
}

export function useFlags(): FlagsState {
  const ctx = useContext(FlagsContext);
  if (!ctx) throw new Error('useFlags must be used within FlagsProvider');
  return ctx;
}
