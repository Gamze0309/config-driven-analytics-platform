import type { AppRouteDefinition } from '../../app/router/routeTypes';
import { createLazyRouteElement, type RouteComponent } from '../../app/router/lazyRouteElement';

const usersElement = createLazyRouteElement(() =>
  import('./pages/UsersPage').then((m) => ({ default: m.UsersPage as RouteComponent })),
);

const userDetailElement = createLazyRouteElement(() =>
  import('./pages/UsersDetailPage').then((m) => ({
    default: m.UsersDetailPage as RouteComponent,
  })),
);

export const usersRoutes: AppRouteDefinition[] = [
  {
    id: 'users',
    path: 'users',
    element: usersElement,
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
  {
    id: 'userDetail',
    path: 'users/:userId',
    element: userDetailElement,
    meta: {
      requiredPermissions: ['users:read'],
      requiredFlags: ['users'],
      tenantScoped: true,
    },
  },
];
