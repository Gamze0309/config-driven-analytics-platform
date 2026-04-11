import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenant } from '../tenant/TenantContext';
import { queryKeys } from '../cache/queryKeys';
import { DEFAULT_FLAGS } from './defaults';
import { fetchRemoteFlagsForTenant } from './mockRemote';
import type { FeatureFlags, FeatureKey } from './types';

export type FlagsState = {
  remoteFlags: FeatureFlags;
  localOverrides: Partial<FeatureFlags>;
  effectiveFlags: FeatureFlags;
  setOverride: (key: FeatureKey, value: boolean | undefined) => void;
  resetOverrides: () => void;
};

const FlagsContext = createContext<FlagsState | null>(null);

function computeEffectiveFlags(remoteFlags: FeatureFlags, localOverrides: Partial<FeatureFlags>): FeatureFlags {
  return {
    users: localOverrides.users ?? remoteFlags.users,
    reports: localOverrides.reports ?? remoteFlags.reports,
    billing: localOverrides.billing ?? remoteFlags.billing,
    flagsAdmin: localOverrides.flagsAdmin ?? remoteFlags.flagsAdmin,
  };
}

export function FlagsProvider({ children }: PropsWithChildren) {
  const { tenantId } = useTenant();

  const flagsQuery = useQuery({
    queryKey: queryKeys.tenant(tenantId).flags(),
    queryFn: async () => {
      const remote = await fetchRemoteFlagsForTenant(tenantId);
      return remote ?? DEFAULT_FLAGS;
    },
  });

  const remoteFlags = flagsQuery.data ?? DEFAULT_FLAGS;

  const [localOverrides, setLocalOverrides] = useState<Partial<FeatureFlags>>({});

  const previousTenantIdRef = useRef(tenantId);

  useEffect(() => {
    if (previousTenantIdRef.current !== tenantId) {
      setLocalOverrides({});
      previousTenantIdRef.current = tenantId;
    }
  }, [tenantId]);

  const setOverride = useCallback((key: FeatureKey, value: boolean | undefined) => {
    setLocalOverrides((prev) => {
      if (value === undefined && prev[key] === undefined) return prev;
      const next = { ...prev };
      if (value === undefined) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  }, []);

  const resetOverrides = useCallback(() => {
    setLocalOverrides({});
  }, []);

  const effectiveFlags = useMemo(() => {
    return computeEffectiveFlags(remoteFlags, localOverrides);
  }, [remoteFlags, localOverrides]);

  const value = useMemo<FlagsState>(
    () => ({ remoteFlags, localOverrides, effectiveFlags, setOverride, resetOverrides }),
    [remoteFlags, localOverrides, effectiveFlags, setOverride, resetOverrides],
  );

  return <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>;
}

export function useFlags(): FlagsState {
  const ctx = useContext(FlagsContext);
  if (!ctx) throw new Error('useFlags must be used within FlagsProvider');
  return ctx;
}
