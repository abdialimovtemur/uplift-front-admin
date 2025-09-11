import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { UserPlanAnalytics } from '@/types/dashboard';
import api from '../api';

interface Filters {
  startDate?: string;
  endDate?: string;
  planType?: string;
}

export const useUserPlansAnalytics = (filters?: Filters) => {
  return useQuery<UserPlanAnalytics, Error>({
    queryKey: ['user-plans-analytics', filters],
    queryFn: () =>
      api.get('/user-plans/analytics', { params: filters }).then(response => response.data.data),
    placeholderData: keepPreviousData,
  });
};