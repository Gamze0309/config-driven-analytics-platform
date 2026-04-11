import type { TenantId } from '../tenant/types';

export const queryKeys = {
  tenants: () => ['tenants'] as const,
  tenant: (tenantId: TenantId) => ({
    all: () => ['tenant', tenantId] as const,
    flags: () => ['tenant', tenantId, 'flags'] as const,
    users: () => ['tenant', tenantId, 'users'] as const,
    user: (userId: string) => ['tenant', tenantId, 'users', userId] as const,
  }),
};
