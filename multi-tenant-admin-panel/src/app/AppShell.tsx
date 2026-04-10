import { useTenant } from '../core/tenant/TenantContext';
import { useRole } from '../core/auth/RoleContext';
import { useFlags } from '../core/flags/FlagsContext';
import type { FeatureKey } from '../core/flags/types';
import './shell.css';

const FEATURE_LABELS: Record<FeatureKey, string> = {
  users: 'Users module',
  reports: 'Reports module',
  billing: 'Billing module',
  flagsAdmin: 'Feature Flags Admin',
};

export function AppShell() {
  const { tenantId, setTenantId, availableTenants } = useTenant();
  const { role, setRoleId, availableRoles, user } = useRole();
  const { remoteFlags, localOverrides, effectiveFlags, setOverride, resetOverrides } =
    useFlags();

  return (
    <div className="shell">
      <header className="shellHeader">
        <div className="shellTitle">
          <div className="appName">Multi-Tenant Admin Panel</div>
        </div>

        <div className="shellControls" role="group" aria-label="Context selectors">
          <label className="control">
            <span className="controlLabel">Tenant</span>
            <select
              className="controlInput"
              value={tenantId}
              onChange={(e) => setTenantId(e.target.value)}
            >
              {availableTenants.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.id})
                </option>
              ))}
            </select>
          </label>

          <label className="control">
            <span className="controlLabel">Role</span>
            <select
              className="controlInput"
              value={role.id}
              onChange={(e) => setRoleId(e.target.value as typeof role.id)}
            >
              {availableRoles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <main className="shellMain">
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

        <section className="card">
          <div className="cardHeaderRow">
            <h2 className="cardTitle">Feature Flags</h2>
            <button className="linkButton" type="button" onClick={resetOverrides}>
              Reset overrides
            </button>
          </div>

          <div className="flagsTable" role="table" aria-label="Feature flags">
            <div className="flagsHeader" role="row">
              <div role="columnheader">Feature</div>
              <div role="columnheader">Remote</div>
              <div role="columnheader">Override</div>
              <div role="columnheader">Effective</div>
              <div role="columnheader">Toggle</div>
            </div>

            {(Object.keys(effectiveFlags) as FeatureKey[]).map((key) => {
              const remote = remoteFlags[key];
              const override = localOverrides[key];
              const effective = effectiveFlags[key];

              return (
                <div className="flagsRow" role="row" key={key}>
                  <div role="cell">
                    <div className="flagName">{FEATURE_LABELS[key]}</div>
                    <div className="flagKey">{key}</div>
                  </div>
                  <div role="cell">{String(remote)}</div>
                  <div role="cell">{override === undefined ? '—' : String(override)}</div>
                  <div role="cell">
                    <span className={effective ? 'pill pillOn' : 'pill pillOff'}>
                      {String(effective)}
                    </span>
                  </div>
                  <div role="cell">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={effective}
                        onChange={(e) => setOverride(key, e.target.checked)}
                        aria-label={`Toggle ${key}`}
                      />
                      <span className="switchTrack" />
                    </label>
                    <button
                      className="miniButton"
                      type="button"
                      onClick={() => setOverride(key, undefined)}
                      disabled={override === undefined}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
