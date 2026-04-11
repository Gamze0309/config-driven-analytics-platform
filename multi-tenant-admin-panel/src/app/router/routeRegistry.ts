import type { AppRouteDefinition } from './routeTypes';
import { homeRoutes } from '../../features/home/routes';
import { usersRoutes } from '../../features/users/routes';

export const featureRoutes: AppRouteDefinition[] = [...homeRoutes, ...usersRoutes];
