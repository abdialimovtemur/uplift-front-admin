import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../api';
import type { PlansResponse, PlanFilters, Plan } from '@/types/pricing';

export const usePlansQuery = (filters: PlanFilters) => {
  return useQuery<PlansResponse, Error>({
    queryKey: ['plans', filters],
    queryFn: () =>
      api.get('/plans', { params: filters }).then(response => response.data),
    placeholderData: keepPreviousData,
  });
};

export const usePlanDetailQuery = (id: string) => {
  return useQuery<Plan, Error>({
    queryKey: ['plan', id],
    queryFn: () => api.get(`/plans/${id}`).then(response => response.data),
    enabled: !!id,
  });
};