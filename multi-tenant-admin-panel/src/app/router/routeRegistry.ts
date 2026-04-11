import type { AppRouteDefinition } from './routeTypes';
import { homeRoutes } from '../../features/home/routes';
import { usersRoutes } from '../../features/users/routes';

export const featureRoutes: AppRouteDefinition[] = [...homeRoutes, ...usersRoutes];

export type PrimaryNavItem = {
  to: string;
  label: string;
  meta?: AppRouteDefinition['meta'];
};

export const primaryNav: PrimaryNavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/users', label: 'Users', meta: usersRoutes[0]?.meta },
];
