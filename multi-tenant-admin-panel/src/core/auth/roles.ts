import type { Role, RoleId } from './types';

export const ROLES: Role[] = [
  {
    id: 'admin',
    name: 'Admin',
    permissions: ['users:read', 'users:write', 'reports:read', 'flags:read', 'flags:write'],
  },
  {
    id: 'analyst',
    name: 'Analyst',
    permissions: ['users:read', 'reports:read', 'flags:read'],
  },
  {
    id: 'viewer',
    name: 'Viewer',
    permissions: ['reports:read'],
  },
];

export function getRole(roleId: RoleId): Role {
  const role = ROLES.find((r) => r.id === roleId);
  if (!role) throw new Error(`Unknown roleId: ${roleId}`);
  return role;
}
