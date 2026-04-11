import type { TenantId } from '../../../core/tenant/types';
import type { UserDto } from './usersApi';

export const REMOTE_USERS_BY_TENANT: Record<string, UserDto[]> = {
  acme: [
    { id: 'u-acme-1', displayName: 'Ada Lovelace', email: 'ada@acme.test' },
    { id: 'u-acme-2', displayName: 'Grace Hopper', email: 'grace@acme.test' },
    { id: 'u-acme-3', displayName: 'Alan Turing', email: 'alan@acme.test' },
  ],
  globex: [
    { id: 'u-globex-1', displayName: 'Katherine Johnson', email: 'katherine@globex.test' },
    { id: 'u-globex-2', displayName: 'Margaret Hamilton', email: 'margaret@globex.test' },
  ],
  initech: [{ id: 'u-initech-1', displayName: 'Linus Torvalds', email: 'linus@initech.test' }],
};

export async function fetchRemoteUsersForTenant(tenantId: TenantId): Promise<UserDto[]> {
  return [...(REMOTE_USERS_BY_TENANT[tenantId] ?? [])];
}

export async function fetchRemoteUserById(
  tenantId: TenantId,
  userId: string,
): Promise<UserDto | null> {
  const users = await fetchRemoteUsersForTenant(tenantId);
  return users.find((u) => u.id === userId) ?? null;
}

export async function deleteRemoteUserById(tenantId: TenantId, userId: string): Promise<boolean> {
  const current = REMOTE_USERS_BY_TENANT[tenantId] ?? [];
  const next = current.filter((u) => u.id !== userId);

  if (next.length === current.length) return false;

  REMOTE_USERS_BY_TENANT[tenantId] = next;
  return true;
}

export async function createRemoteUser(
  tenantId: TenantId,
  user: Omit<UserDto, 'id'> & { id?: string },
): Promise<UserDto> {
  const current = REMOTE_USERS_BY_TENANT[tenantId] ?? [];
  const created: UserDto = {
    id: user.id ?? `u-${tenantId}-${Date.now()}`,
    displayName: user.displayName,
    email: user.email,
  };

  REMOTE_USERS_BY_TENANT[tenantId] = [created, ...current];
  return created;
}
