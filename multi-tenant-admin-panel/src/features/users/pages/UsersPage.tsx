import { useTenant } from '../../../core/tenant/tenantContext';
import { useRole } from '../../../core/auth/roleContext';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../../core/cache/queryKeys';
import { useUsersQuery } from '../queries/useUsersQuery';
import { usersApi } from '../api/usersApi';

export function UsersPage() {
  const { tenantId } = useTenant();
  const { role } = useRole();
  const queryClient = useQueryClient();

  const usersQuery = useUsersQuery(tenantId);
  const canWriteUsers = role.permissions.includes('users:write');
  const users = usersQuery.data ?? [];

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await usersApi.delete({ tenantId, userId });
      if (!res.deleted) throw new Error('User not found');
      return res;
    },
    onSuccess: async (_, userId) => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tenant(tenantId).users() });
      await queryClient.invalidateQueries({ queryKey: queryKeys.tenant(tenantId).user(userId) });
    },
  });

  const createUserMutation = useMutation({
    mutationFn: async () => {
      const suffix = new Date().toISOString().slice(11, 19).replaceAll(':', '');
      const res = await usersApi.create({
        tenantId,
        displayName: `New User ${suffix}`,
        email: `new.user.${suffix}@${tenantId}.test`,
      });
      return res.user;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.tenant(tenantId).users() });
    },
  });

  return (
    <section className="card">
      <div className="cardHeaderRow">
        <h2 className="cardTitle">Users</h2>
        <button
          className="linkButton"
          type="button"
          disabled={!canWriteUsers || createUserMutation.isPending}
          onClick={() => createUserMutation.mutate()}
        >
          Create user
        </button>
      </div>

      {usersQuery.isLoading ? (
        <p>Loading…</p>
      ) : usersQuery.isError ? (
        <p>Failed to load users.</p>
      ) : deleteUserMutation.isError ? (
        <p>Failed to delete user.</p>
      ) : createUserMutation.isError ? (
        <p>Failed to create user.</p>
      ) : users.length === 0 ? (
        <p>No users found for tenant {tenantId}.</p>
      ) : (
        <div className="kv">
          {users.map((u) => (
            <div className="kvRow" key={u.id}>
              <div className="kvKey">{u.displayName}</div>
              <div className="kvVal">
                {u.email}{' '}
                <Link className="miniButton" to={`/users/${u.id}`}>
                  View
                </Link>
                <button
                  className="miniButton"
                  type="button"
                  disabled={!canWriteUsers || deleteUserMutation.isPending}
                  onClick={() => deleteUserMutation.mutate(u.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
