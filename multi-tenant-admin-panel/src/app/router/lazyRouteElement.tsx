import { Suspense, lazy, type ComponentType, type ReactNode } from 'react';
import { RouteLoading } from './pages/RouteLoading';

export type RouteComponent = ComponentType<Record<string, never>>;

export function createLazyRouteElement(
  loader: () => Promise<{ default: RouteComponent }>,
): ReactNode {
  const LazyComponent = lazy(loader);

  return (
    <Suspense fallback={<RouteLoading />}>
      <LazyComponent />
    </Suspense>
  );
}
