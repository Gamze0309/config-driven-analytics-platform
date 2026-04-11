import type { ReactNode } from 'react';
import { useTenant } from '../../../core/tenant/TenantContext';
import { useRole } from '../../../core/auth/RoleContext';
import { useFlags } from '../../../core/flags/FlagsContext';
import type { RouteMeta } from '../routeTypes';
import { evaluateRouteAccess } from '../routeAccess';
import { ForbiddenPage } from '../pages/ForbiddenPage';
import { ErrorBoundary } from '../../../shared/errors/ErrorBoundary';

export function RouteGate(props: { meta?: RouteMeta; children: ReactNode }) {
  const { tenantId } = useTenant();
  const { role } = useRole();
  const { effectiveFlags } = useFlags();

  const result = evaluateRouteAccess(props.meta, {
    tenantId,
    permissions: role.permissions,
    flags: effectiveFlags,
  });

  if (!result.allowed) {
    return (
      <ForbiddenPage
        missingPermissions={result.missingPermissions}
        missingFlags={result.missingFlags}
      />
    );
  }

  return <ErrorBoundary name="Route">{props.children}</ErrorBoundary>;
}
