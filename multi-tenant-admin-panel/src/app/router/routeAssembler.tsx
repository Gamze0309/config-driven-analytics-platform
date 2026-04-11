import type { RouteObject } from 'react-router-dom';
import { AppShell } from '../AppShell';
import { RouteGate } from './guards/RouteGate';
import { featureRoutes } from './routeRegistry';

export function assembleRoutes(): RouteObject[] {
  return [
    {
      path: '/',
      element: <AppShell />,
      children: featureRoutes.map((r) => {
        const guardedElement = <RouteGate meta={r.meta}>{r.element}</RouteGate>;

        if (r.path === '') {
          return {
            index: true,
            element: guardedElement,
            handle: { id: r.id, meta: r.meta },
          };
        }

        return {
          path: r.path,
          element: guardedElement,
          handle: { id: r.id, meta: r.meta },
        };
      }),
    },
  ];
}
