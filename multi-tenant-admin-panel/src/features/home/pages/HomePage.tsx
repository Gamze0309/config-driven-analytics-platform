import { useTenant } from '../../../core/tenant/tenantContext';
import { useRole } from '../../../core/auth/roleContext';
import { useFlags } from '../../../core/flags/flagsContext';
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
  const { flags } = useFlags();

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

          <div className="flagsTable cols2" role="table" aria-label="Feature flags">
            <div className="flagsHeader" role="row">
              <div role="columnheader">Feature</div>
              <div role="columnheader">Enabled</div>
            </div>

            {(Object.keys(flags) as FeatureKey[]).map((key) => {
              const enabled = flags[key];

              return (
                <div className="flagsRow" role="row" key={key}>
                  <div role="cell">
                    <div className="flagName">{FEATURE_LABELS[key]}</div>
                    <div className="flagKey">{key}</div>
                  </div>
                  <div role="cell">
                    <span className={enabled ? 'pill pillOn' : 'pill pillOff'}>
                      {String(enabled)}
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
