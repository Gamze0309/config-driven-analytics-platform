import type { AppRouteDefinition } from '../../app/router/routeTypes';
import { HomePage } from './pages/HomePage';

export const homeRoutes: AppRouteDefinition[] = [
  {
    id: 'home',
    path: '',
    element: <HomePage />,
  },
];
