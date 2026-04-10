export type Permission =
  | 'users:read'
  | 'users:write'
  | 'reports:read'
  | 'flags:read'
  | 'flags:write';

export type RoleId = 'admin' | 'analyst' | 'viewer';

export type Role = {
  id: RoleId;
  name: string;
  permissions: Permission[];
};

export type User = {
  id: string;
  displayName: string;
  roleId: RoleId;
};
