import type { ReactNode } from 'react';
import type { Permission } from '../../core/auth/types';
import type { FeatureKey } from '../../core/flags/types';

export type RouteMeta = {
  requiredPermissions?: Permission[];
  requiredFlags?: FeatureKey[];
  tenantScoped?: boolean;
};

export type AppRouteDefinition = {
  id: string;
  path: string;
  element: ReactNode;
  meta?: RouteMeta;
  nav?: {
    label: string;
    order?: number;
  };
};
