import type { AppRouteDefinition } from '../../app/router/routeTypes';
import type { ComponentType } from 'react';
import { createLazyRouteElement } from '../../app/router/lazyRouteElement';

const flagsAdminElement = createLazyRouteElement(() =>
  import('./pages/FlagsAdminPage').then((m) => ({
    default: m.FlagsAdminPage as ComponentType<any>,
  })),
);

export const flagsAdminRoutes: AppRouteDefinition[] = [
  {
    id: 'flagsAdmin',
    path: 'flags-admin',
    element: flagsAdminElement,
    meta: {
      requiredPermissions: ['flags:write'],
      requiredFlags: ['flagsAdmin'],
      tenantScoped: true,
    },
    nav: {
      label: 'Flags Admin',
      order: 20,
    },
  },
];
