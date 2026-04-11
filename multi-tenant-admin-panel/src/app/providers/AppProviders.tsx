import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { RoleProvider } from '../../core/auth/RoleContext';
import { queryClient } from '../../core/cache/queryClient';
import { FlagsProvider } from '../../core/flags/FlagsContext';
import { TenantProvider } from '../../core/tenant/TenantContext';

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <TenantProvider>
        <RoleProvider>
          <FlagsProvider>{children}</FlagsProvider>
        </RoleProvider>
      </TenantProvider>
    </QueryClientProvider>
  );
}
