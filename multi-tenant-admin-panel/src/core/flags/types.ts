export type FeatureKey = 'users' | 'reports' | 'billing' | 'flagsAdmin';

export type FeatureFlags = Record<FeatureKey, boolean>;
