import { useMemo, useReducer, type PropsWithChildren } from 'react';
import { getRole, ROLES } from './roles';
import type { RoleId, User } from './types';
import { RoleContext, type RoleState } from './roleContext';

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
