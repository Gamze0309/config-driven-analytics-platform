import { createContext, useContext } from 'react';
import type { Role, RoleId, User } from './types';

export type RoleState = {
  user: User;
  role: Role;
  setRoleId: (roleId: RoleId) => void;
  availableRoles: { id: RoleId; name: string }[];
};

export const RoleContext = createContext<RoleState | null>(null);

export function useRole(): RoleState {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
