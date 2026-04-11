import type { ReactNode } from 'react';
import { useTenant } from '../../../core/tenant/tenantContext';
import { useRole } from '../../../core/auth/roleContext';
import { useFlags } from '../../../core/flags/flagsContext';
import type { RouteMeta } from '../routeTypes';
import { evaluateRouteAccess } from '../routeAccess';
import { ForbiddenPage } from '../pages/ForbiddenPage';
import { ErrorBoundary } from '../../../shared/errors/ErrorBoundary';

export function RouteGate(props: { meta?: RouteMeta; children: ReactNode }) {
  const { tenantId } = useTenant();
  const { role } = useRole();
  const { flags } = useFlags();

  const result = evaluateRouteAccess(props.meta, {
    tenantId,
    permissions: role.permissions,
    flags,
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
