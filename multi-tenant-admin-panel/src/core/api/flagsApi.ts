import type { FeatureFlags, FeatureKey } from '../flags/types';
import { fetchRemoteFlagsForTenant, updateRemoteFlagForTenant } from '../flags/mockRemote';
import type { TenantId } from '../tenant/types';

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
    const flags = await fetchRemoteFlagsForTenant(tenantId);
    return { flags };
  },

  updateForTenant: async (tenantId: TenantId, update: UpdateFlagRequest): Promise<UpdateFlagResponse> => {
    const flags = await updateRemoteFlagForTenant(tenantId, update.key, update.enabled);
    return { flags };
  },
};
