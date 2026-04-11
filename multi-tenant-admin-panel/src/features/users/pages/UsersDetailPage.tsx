import { Link, useParams } from 'react-router-dom';
import { useTenant } from '../../../core/tenant/TenantContext';
import { useUserQuery } from '../queries/useUserQuery';

export function UsersDetailPage() {
  const { tenantId } = useTenant();
  const { userId } = useParams();

  const userQuery = useUserQuery(tenantId, userId);

  return (
    <section className="card">
      <div className="cardHeaderRow">
        <h2 className="cardTitle">User Detail</h2>
        <Link className="linkButton" to="/users">
          Back to list
        </Link>
      </div>

      {userQuery.isLoading ? (
        <p>Loading…</p>
      ) : userQuery.isError ? (
        <p>Failed to load user.</p>
      ) : !userQuery.data ? (
        <p>User not found.</p>
      ) : (
        <div className="kv">
          <div className="kvRow">
            <div className="kvKey">id</div>
            <div className="kvVal">{userQuery.data.id}</div>
          </div>
          <div className="kvRow">
            <div className="kvKey">displayName</div>
            <div className="kvVal">{userQuery.data.displayName}</div>
          </div>
          <div className="kvRow">
            <div className="kvKey">email</div>
            <div className="kvVal">{userQuery.data.email}</div>
          </div>
        </div>
      )}
    </section>
  );
}
