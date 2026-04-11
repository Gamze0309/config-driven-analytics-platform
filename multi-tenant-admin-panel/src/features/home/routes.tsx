import type { AppRouteDefinition } from '../../app/router/routeTypes';
import { lazy, Suspense } from 'react';
import { RouteLoading } from '../../app/router/pages/RouteLoading';

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));

export const homeRoutes: AppRouteDefinition[] = [
  {
    id: 'home',
    path: '',
    element: (
      <Suspense fallback={<RouteLoading />}>
        <HomePage />
      </Suspense>
    ),
    nav: {
      label: 'Home',
      order: 0,
    },
  },
];
