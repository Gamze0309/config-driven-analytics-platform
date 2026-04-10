import { useTenant } from '../../../core/tenant/TenantContext';
import { useRole } from '../../../core/auth/RoleContext';

export function UsersPage() {
  const { tenantId } = useTenant();
  const { role } = useRole();

  return (
    <section className="card">
      <h2 className="cardTitle">Users</h2>
      <p>
        Tenant: <b>{tenantId}</b>, Role:{' '}
        <b>{role.id}</b>
      </p>
    </section>
  );
}
