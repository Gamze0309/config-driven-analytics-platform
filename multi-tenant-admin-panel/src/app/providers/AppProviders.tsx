import type { PropsWithChildren } from 'react';
import { RoleProvider } from '../../core/auth/RoleContext';
import { FlagsProvider } from '../../core/flags/FlagsContext';
import { TenantProvider } from '../../core/tenant/TenantContext';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <TenantProvider>
      <RoleProvider>
        <FlagsProvider>{children}</FlagsProvider>
      </RoleProvider>
    </TenantProvider>
  );
}
