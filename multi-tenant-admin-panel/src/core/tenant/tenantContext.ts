import { createContext, useContext } from 'react';
import type { TenantId } from './types';

export type TenantState = {
  tenantId: TenantId;
  setTenantId: (tenantId: TenantId) => void;
  availableTenants: { id: TenantId; name: string }[];
};

export const TenantContext = createContext<TenantState | null>(null);

export function useTenant(): TenantState {
  const ctx = useContext(TenantContext);
  if (!ctx) throw new Error('useTenant must be used within TenantProvider');
  return ctx;
}
