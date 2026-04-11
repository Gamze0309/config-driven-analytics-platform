import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useTenant } from '../../../core/tenant/TenantContext';
import { queryKeys } from '../../../core/cache/queryKeys';
import type { FeatureKey } from '../../../core/flags/types';
import { DEFAULT_FLAGS } from '../../../core/flags/defaults';
import { flagsApi } from '../../../core/api/flagsApi';

const FEATURE_LABELS: Record<FeatureKey, string> = {
  users: 'Users module',
  reports: 'Reports module',
  billing: 'Billing module',
  flagsAdmin: 'Feature Flags Admin',
};

export function FlagsAdminPage() {
  const { tenantId } = useTenant();
  const queryClient = useQueryClient();

  const flagsQuery = useQuery({
    queryKey: queryKeys.tenant(tenantId).flags(),
    queryFn: async () => {
      const remote = await flagsApi.getForTenant(tenantId);
      return remote.flags ?? DEFAULT_FLAGS;
    },
  });

  const updateFlagMutation = useMutation({
    mutationFn: async (vars: { key: FeatureKey; value: boolean }) => {
      await flagsApi.updateForTenant(tenantId, { key: vars.key, enabled: vars.value });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tenant(tenantId).flags() });
    },
  });

  const flags = flagsQuery.data ?? DEFAULT_FLAGS;

  return (
    <section className="card">
      <div className="cardHeaderRow">
        <h2 className="cardTitle">Flags Admin</h2>
        <div className="kvVal">Tenant: {tenantId}</div>
      </div>

      {flagsQuery.isLoading ? (
        <p>Loading…</p>
      ) : flagsQuery.isError ? (
        <p>Failed to load flags.</p>
      ) : (
        <div className="flagsTable cols4" role="table" aria-label="Admin feature flags">
          <div className="flagsHeader" role="row">
            <div role="columnheader">Feature</div>
            <div role="columnheader">Remote</div>
            <div role="columnheader">Toggle</div>
            <div role="columnheader">Status</div>
          </div>

          {(Object.keys(flags) as FeatureKey[]).map((key) => {
            const value = flags[key];

            return (
              <div className="flagsRow" role="row" key={key}>
                <div role="cell">
                  <div className="flagName">{FEATURE_LABELS[key]}</div>
                  <div className="flagKey">{key}</div>
                </div>
                <div role="cell">{String(value)}</div>
                <div role="cell">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={value}
                      disabled={updateFlagMutation.isPending}
                      onChange={(e) => updateFlagMutation.mutate({ key, value: e.target.checked })}
                      aria-label={`Toggle remote ${key}`}
                    />
                    <span className="switchTrack" />
                  </label>
                </div>
                <div role="cell">
                  {updateFlagMutation.isPending ? (
                    <span className="pill">Saving…</span>
                  ) : (
                    <span className={value ? 'pill pillOn' : 'pill pillOff'}>{String(value)}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
