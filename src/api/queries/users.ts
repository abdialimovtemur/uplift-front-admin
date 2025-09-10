import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { UsersResponse, User, UserFilters } from '@/types/user';
import api from '../api';

export const useUsersQuery = (filters: UserFilters) => {
  return useQuery<UsersResponse, Error>({
    queryKey: ['users', filters],
    queryFn: () =>
      api.get('/users', { params: filters }).then(response => response.data),
    placeholderData: keepPreviousData,
  });
};

export const useUserDetailQuery = (id: string) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => api.get(`/users/${id}`).then(response => response.data.data),
    enabled: !!id,
  });
};

