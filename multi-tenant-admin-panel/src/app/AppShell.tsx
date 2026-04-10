import { useTenant } from '../core/tenant/TenantContext';
import { useRole } from '../core/auth/RoleContext';
import './shell.css';

export function AppShell() {
  const { tenantId, setTenantId, availableTenants } = useTenant();
  const { role, setRoleId, availableRoles, user } = useRole();

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
      </main>
    </div>
  );
}
