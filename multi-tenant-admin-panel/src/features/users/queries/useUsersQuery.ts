import { useQuery } from '@tanstack/react-query';
import type { TenantId } from '../../../core/tenant/types';
import { queryKeys } from '../../../core/cache/queryKeys';
import { usersApi } from '../api/usersApi';

export function useUsersQuery(tenantId: TenantId) {
  return useQuery({
    queryKey: queryKeys.tenant(tenantId).users(),
    queryFn: async () => {
      const res = await usersApi.list({ tenantId });
      return res.items;
    },
  });
}
