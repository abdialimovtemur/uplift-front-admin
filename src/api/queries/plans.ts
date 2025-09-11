import { useQuery } from '@tanstack/react-query';
import api from '../api';
import type { Plan } from '@/types/userPlan';

export const useActivePlansQuery = () => {
  return useQuery<Plan[], Error>({
    queryKey: ['active-plans'],
    queryFn: () => 
      api.get('/plans/active').then(response => response.data.data),
  });
};