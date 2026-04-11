import type { AppRouteDefinition } from '../../app/router/routeTypes';
import { createLazyRouteElement, type RouteComponent } from '../../app/router/lazyRouteElement';

const homeElement = createLazyRouteElement(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage as RouteComponent })),
);

export const homeRoutes: AppRouteDefinition[] = [
  {
    id: 'home',
    path: '',
    element: homeElement,
    nav: {
      label: 'Home',
      order: 0,
    },
  },
];
