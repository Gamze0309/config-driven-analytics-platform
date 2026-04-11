import type { TenantId } from '../../../core/tenant/types';
import { httpClient } from '../../../core/api/httpClient';

export type UserDto = {
  id: string;
  displayName: string;
  email: string;
};

export type ListUsersResponse = {
  items: UserDto[];
};

export const usersApi = {
  list: async (params: { tenantId: TenantId }): Promise<ListUsersResponse> => {
    return httpClient.request<ListUsersResponse>({
      path: `/tenants/${params.tenantId}/users`,
      method: 'GET',
    });
  },
};
