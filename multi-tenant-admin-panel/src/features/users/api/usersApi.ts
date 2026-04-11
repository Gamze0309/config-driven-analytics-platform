import type { TenantId } from '../../../core/tenant/types';
import { deleteRemoteUserById, fetchRemoteUserById, fetchRemoteUsersForTenant } from './mockRemote';

export type UserDto = {
  id: string;
  displayName: string;
  email: string;
};

export type ListUsersResponse = {
  items: UserDto[];
};

export type GetUserResponse = {
  user: UserDto | null;
};

export type DeleteUserResponse = {
  deleted: boolean;
};

export const usersApi = {
  list: async (params: { tenantId: TenantId }): Promise<ListUsersResponse> => {
    const items = await fetchRemoteUsersForTenant(params.tenantId);
    return { items };
  },

  getById: async (params: { tenantId: TenantId; userId: string }): Promise<GetUserResponse> => {
    const user = await fetchRemoteUserById(params.tenantId, params.userId);
    return { user };
  },

  delete: async (params: { tenantId: TenantId; userId: string }): Promise<DeleteUserResponse> => {
    const deleted = await deleteRemoteUserById(params.tenantId, params.userId);
    return { deleted };
  },
};
