import type { PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../../core/cache/queryClient';
import { RoleProvider } from '../../core/auth/RoleProvider';
import { FlagsProvider } from '../../core/flags/FlagsProvider';
import { TenantProvider } from '../../core/tenant/TenantProvider';

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
