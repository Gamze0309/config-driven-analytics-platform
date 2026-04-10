import type { AppRouteDefinition } from '../../app/router/routeTypes';
import { UsersPage } from './pages/UsersPage';

export const usersRoutes: AppRouteDefinition[] = [
  {
    id: 'users',
    path: 'users',
    element: <UsersPage />,
    meta: {
      requiredPermissions: ['users:read'],
      requiredFlags: ['users'],
      tenantScoped: true,
    },
  },
];
