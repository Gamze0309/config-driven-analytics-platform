import { NavLink, Outlet } from 'react-router-dom';
import { useTenant } from '../core/tenant/TenantContext';
import { useRole } from '../core/auth/RoleContext';
import './shell.css';

export function AppShell() {
  const { tenantId, setTenantId, availableTenants } = useTenant();
  const { role, setRoleId, availableRoles } = useRole();

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

      <nav className="shellNav" aria-label="Primary">
        <NavLink className={({ isActive }) => (isActive ? 'navLink navLinkActive' : 'navLink')} to="/">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'navLink navLinkActive' : 'navLink')} to="/users">
          Users
        </NavLink>
      </nav>

      <main className="shellMain">
        <Outlet />
      </main>
    </div>
  );
}
