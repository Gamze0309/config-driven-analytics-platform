import type { PropsWithChildren } from 'react';
import { RoleProvider } from '../../core/auth/RoleContext';
import { TenantProvider } from '../../core/tenant/TenantContext';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <TenantProvider>
      <RoleProvider>{children}</RoleProvider>
    </TenantProvider>
  );
}
