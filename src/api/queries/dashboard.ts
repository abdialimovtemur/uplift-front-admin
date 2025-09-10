import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { UserPlanAnalytics, DashboardFilters } from '@/types/dashboard';
import api from '../api';

export const useUserPlansAnalytics = (filters?: DashboardFilters) => {
  return useQuery<UserPlanAnalytics, Error>({
    queryKey: ['user-plans-analytics', filters],
    queryFn: () =>
      api.get('/user-plans/analytics', { params: filters }).then(response => response.data.data),
    placeholderData: keepPreviousData,
  });
};