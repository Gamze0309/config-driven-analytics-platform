import { useTenant } from '../../../core/tenant/TenantContext';
import { useRole } from '../../../core/auth/RoleContext';
import { useFlags } from '../../../core/flags/FlagsContext';
import type { FeatureKey } from '../../../core/flags/types';

const FEATURE_LABELS: Record<FeatureKey, string> = {
  users: 'Users module',
  reports: 'Reports module',
  billing: 'Billing module',
  flagsAdmin: 'Feature Flags Admin',
};

export function HomePage() {
  const { tenantId } = useTenant();
  const { role, user } = useRole();
  const { remoteFlags, effectiveFlags } = useFlags();

  const canReadFlags = role.permissions.includes('flags:read');

  return (
    <>
      <section className="card">
        <h2 className="cardTitle">Active Context</h2>
        <div className="kv">
          <div className="kvRow">
            <div className="kvKey">tenantId</div>
            <div className="kvVal">{tenantId}</div>
          </div>
          <div className="kvRow">
            <div className="kvKey">user</div>
            <div className="kvVal">{user.displayName}</div>
          </div>
          <div className="kvRow">
            <div className="kvKey">role</div>
            <div className="kvVal">
              {role.name} ({role.id})
            </div>
          </div>
          <div className="kvRow">
            <div className="kvKey">permissions</div>
            <div className="kvVal">{role.permissions.join(', ')}</div>
          </div>
        </div>
      </section>

      {canReadFlags ? (
        <section className="card">
          <div className="cardHeaderRow">
            <h2 className="cardTitle">Feature Flags</h2>
          </div>

          <div className="flagsTable cols3" role="table" aria-label="Feature flags">
            <div className="flagsHeader" role="row">
              <div role="columnheader">Feature</div>
              <div role="columnheader">Remote</div>
              <div role="columnheader">Effective</div>
            </div>

            {(Object.keys(effectiveFlags) as FeatureKey[]).map((key) => {
              const remote = remoteFlags[key];
              const effective = effectiveFlags[key];

              return (
                <div className="flagsRow" role="row" key={key}>
                  <div role="cell">
                    <div className="flagName">{FEATURE_LABELS[key]}</div>
                    <div className="flagKey">{key}</div>
                  </div>
                  <div role="cell">{String(remote)}</div>
                  <div role="cell">
                    <span className={effective ? 'pill pillOn' : 'pill pillOff'}>
                      {String(effective)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ) : null}
    </>
  );
}
