import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from 'react';
import { TENANTS } from './tenants';
import type { TenantId } from './types';

type TenantModel = {
  tenantId: TenantId;
};

type TenantAction = { type: 'tenant/set'; tenantId: TenantId };

function tenantReducer(state: TenantModel, action: TenantAction): TenantModel {
  switch (action.type) {
    case 'tenant/set':
      return { ...state, tenantId: action.tenantId };
    default:
      return state;
  }
}

export type TenantState = {
  tenantId: TenantId;
  setTenantId: (tenantId: TenantId) => void;
  availableTenants: { id: TenantId; name: string }[];
};

const TenantContext = createContext<TenantState | null>(null);

export function TenantProvider({ children }: PropsWithChildren) {
  const [model, dispatch] = useReducer(tenantReducer, { tenantId: TENANTS[0]?.id ?? 'acme' });

  const availableTenants = useMemo(
    () => TENANTS.map((t) => ({ id: t.id, name: t.name })),
    [],
  );

  const value = useMemo<TenantState>(() => {
    return {
      tenantId: model.tenantId,
      setTenantId: (tenantId) => dispatch({ type: 'tenant/set', tenantId }),
      availableTenants,
    };
  }, [model.tenantId, availableTenants]);

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
}

export function useTenant(): TenantState {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenant must be used within TenantProvider');
  return ctx;
}
