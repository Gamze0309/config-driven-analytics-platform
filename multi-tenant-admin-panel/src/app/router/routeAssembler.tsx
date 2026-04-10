import type { RouteObject } from 'react-router-dom';
import { AppShell } from '../AppShell';
import { homeRoutes } from '../../features/home/routes';
import { usersRoutes } from '../../features/users/routes';

export function assembleRoutes(): RouteObject[] {
  const featureRoutes = [...homeRoutes, ...usersRoutes];

  return [
    {
      path: '/',
      element: <AppShell />,
      children: featureRoutes.map((r) => ({
        path: r.path,
        element: r.element,
      })),
    },
  ];
}
