import type { Tenant } from '../tenant/types';
import { httpClient } from './httpClient';

export type ListTenantsResponse = {
  tenants: Tenant[];
};

export const tenantsApi = {
  list: async (): Promise<ListTenantsResponse> => {
    return httpClient.request<ListTenantsResponse>({
      path: '/tenants',
      method: 'GET',
    });
  },
};
