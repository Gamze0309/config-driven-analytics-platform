import type { FeatureFlags } from '../flags/types';
import type { TenantId } from '../tenant/types';
import { httpClient } from './httpClient';

export type GetFlagsResponse = {
  flags: FeatureFlags;
};

export const flagsApi = {
  getForTenant: async (tenantId: TenantId): Promise<GetFlagsResponse> => {
    return httpClient.request<GetFlagsResponse>({
      path: `/tenants/${tenantId}/flags`,
      method: 'GET',
    });
  },
};
