import type { AppRouteDefinition } from '../../app/router/routeTypes';
import { createLazyRouteElement, type RouteComponent } from '../../app/router/lazyRouteElement';

const flagsAdminElement = createLazyRouteElement(() =>
  import('./pages/FlagsAdminPage').then((m) => ({
    default: m.FlagsAdminPage as RouteComponent,
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
