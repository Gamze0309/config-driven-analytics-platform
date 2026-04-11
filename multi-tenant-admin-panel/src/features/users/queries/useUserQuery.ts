import { useQuery } from '@tanstack/react-query';
import type { TenantId } from '../../../core/tenant/types';
import { queryKeys } from '../../../core/cache/queryKeys';
import { usersApi } from '../api/usersApi';

export function useUserQuery(tenantId: TenantId, userId: string | undefined) {
  return useQuery({
    queryKey: queryKeys.tenant(tenantId).user(userId ?? 'unknown'),
    enabled: Boolean(userId),
    queryFn: async () => {
      if (!userId) return null;
      const res = await usersApi.getById({ tenantId, userId });
      return res.user;
    },
  });
}
