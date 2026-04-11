import type { AppRouteDefinition } from '../../app/router/routeTypes';
import type { ComponentType } from 'react';
import { createLazyRouteElement } from '../../app/router/lazyRouteElement';

const homeElement = createLazyRouteElement(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage as ComponentType<any> })),
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
