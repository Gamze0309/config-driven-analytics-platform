import type { FeatureFlags } from './types';

export const DEFAULT_FLAGS: FeatureFlags = {
  users: true,
  reports: true,
  billing: false,
  flagsAdmin: true,
};
