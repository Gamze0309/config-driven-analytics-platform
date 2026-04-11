import type { AppRouteDefinition } from '../../app/router/routeTypes';
import { lazy, Suspense } from 'react';
import { RouteLoading } from '../../app/router/pages/RouteLoading';

const UsersPage = lazy(() => import('./pages/UsersPage').then((m) => ({ default: m.UsersPage })));

export const usersRoutes: AppRouteDefinition[] = [
  {
    id: 'users',
    path: 'users',
    element: (
      <Suspense fallback={<RouteLoading />}>
        <UsersPage />
      </Suspense>
    ),
    meta: {
      requiredPermissions: ['users:read'],
      requiredFlags: ['users'],
      tenantScoped: true,
    },
    nav: {
      label: 'Users',
      order: 10,
    },
  },
];
