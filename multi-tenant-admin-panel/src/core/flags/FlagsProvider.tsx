import { useMemo, type PropsWithChildren } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTenant } from '../tenant/tenantContext';
import { queryKeys } from '../cache/queryKeys';
import { DEFAULT_FLAGS } from './defaults';
import { flagsApi } from '../api/flagsApi';
import { FlagsContext, type FlagsState } from './flagsContext';

export function FlagsProvider({ children }: PropsWithChildren) {
  const { tenantId } = useTenant();

  const flagsQuery = useQuery({
    queryKey: queryKeys.tenant(tenantId).flags(),
    queryFn: async () => {
      const remote = await flagsApi.getForTenant(tenantId);
      return remote.flags ?? DEFAULT_FLAGS;
    },
  });

  const flags = flagsQuery.data ?? DEFAULT_FLAGS;

  const value = useMemo<FlagsState>(() => ({ flags }), [flags]);

  return <FlagsContext.Provider value={value}>{children}</FlagsContext.Provider>;
}
