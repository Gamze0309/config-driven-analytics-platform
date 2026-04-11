import type { FeatureFlags } from './types';

export const REMOTE_FLAGS_BY_TENANT: Record<string, FeatureFlags> = {
  acme: { users: true, reports: true, billing: true, flagsAdmin: true },
  globex: { users: false, reports: true, billing: false, flagsAdmin: true },
  initech: { users: true, reports: false, billing: false, flagsAdmin: false },
};

export async function fetchRemoteFlagsForTenant(tenantId: string): Promise<FeatureFlags | null> {
  return REMOTE_FLAGS_BY_TENANT[tenantId] ?? null;
}
