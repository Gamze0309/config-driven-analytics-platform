import type { Permission } from '../../core/auth/types';
import type { FeatureKey } from '../../core/flags/types';
import type { RouteMeta } from './routeTypes';

export type RouteAccessContext = {
  tenantId?: string;
  permissions: Permission[];
  flags: Record<FeatureKey, boolean>;
};

export type RouteAccessResult = {
  allowed: boolean;
  missingPermissions: Permission[];
  missingFlags: FeatureKey[];
};

export function evaluateRouteAccess(
  meta: RouteMeta | undefined,
  ctx: RouteAccessContext,
): RouteAccessResult {
  if (!meta) {
    return { allowed: true, missingPermissions: [], missingFlags: [] };
  }

  if (meta.tenantScoped && !ctx.tenantId) {
    return { allowed: false, missingPermissions: [], missingFlags: [] };
  }

  const requiredPermissions = meta.requiredPermissions ?? [];
  const requiredFlags = meta.requiredFlags ?? [];

  const missingPermissions = requiredPermissions.filter(
    (p) => !ctx.permissions.includes(p),
  );

  const missingFlags = requiredFlags.filter((k) => !ctx.flags[k]);

  return {
    allowed: missingPermissions.length === 0 && missingFlags.length === 0,
    missingPermissions,
    missingFlags,
  };
}

export function canAccessRoute(meta: RouteMeta | undefined, ctx: RouteAccessContext): boolean {
  return evaluateRouteAccess(meta, ctx).allowed;
}
