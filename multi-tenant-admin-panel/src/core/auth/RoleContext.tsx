import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react';
import { getRole, ROLES } from './roles';
import type { Role, RoleId, User } from './types';

type RoleModel = {
  roleId: RoleId;
};

type RoleAction = { type: 'role/set'; roleId: RoleId };

function roleReducer(state: RoleModel, action: RoleAction): RoleModel {
  switch (action.type) {
    case 'role/set':
      return { ...state, roleId: action.roleId };
    default:
      return state;
  }
}

export type RoleState = {
  user: User;
  role: Role;
  setRoleId: (roleId: RoleId) => void;
  availableRoles: { id: RoleId; name: string }[];
};

const RoleContext = createContext<RoleState | null>(null);

export function RoleProvider({ children }: PropsWithChildren) {
  const [model, dispatch] = useReducer(roleReducer, { roleId: 'admin' });

  const availableRoles = useMemo(
    () => ROLES.map((r) => ({ id: r.id, name: r.name })),
    [],
  );

  const user = useMemo<User>(
    () => ({ id: 'demo-user', displayName: 'Demo User', roleId: model.roleId }),
    [model.roleId],
  );

  const role = useMemo(() => getRole(model.roleId), [model.roleId]);

  const value = useMemo<RoleState>(() => {
    return {
      user,
      role,
      setRoleId: (roleId) => dispatch({ type: 'role/set', roleId }),
      availableRoles,
    };
  }, [user, role, availableRoles]);

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleState {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRole must be used within RoleProvider');
  return ctx;
}
