import type { FeatureFlags, FeatureKey } from '../flags/types';
import type { TenantId } from '../tenant/types';
import { httpClient } from './httpClient';

export type GetFlagsResponse = {
  flags: FeatureFlags | null;
};

export type UpdateFlagRequest = {
  key: FeatureKey;
  enabled: boolean;
};

export type UpdateFlagResponse = {
  flags: FeatureFlags;
};

export const flagsApi = {
  getForTenant: async (tenantId: TenantId): Promise<GetFlagsResponse> => {
    return httpClient.request<GetFlagsResponse>({
      path: `/tenants/${tenantId}/flags`,
      method: 'GET',
    });
  },

  updateForTenant: async (tenantId: TenantId, update: UpdateFlagRequest): Promise<UpdateFlagResponse> => {
    return httpClient.request<UpdateFlagResponse>({
      path: `/tenants/${tenantId}/flags`,
      method: 'PATCH',
      body: update,
    });
  },
};
