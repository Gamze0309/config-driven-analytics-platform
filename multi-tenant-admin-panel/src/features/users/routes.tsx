import type { AppRouteDefinition } from '../../app/router/routeTypes';
import type { ComponentType } from 'react';
import { createLazyRouteElement } from '../../app/router/lazyRouteElement';

const usersElement = createLazyRouteElement(() =>
  import('./pages/UsersPage').then((m) => ({ default: m.UsersPage as ComponentType<any> })),
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
];
