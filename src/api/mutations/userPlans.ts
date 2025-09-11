import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import type { PromoteUserRequest } from '@/types/userPlan';
import { toast } from 'sonner';

export const usePromoteUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PromoteUserRequest) => 
      api.post('/user-plans/promote', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('User plan updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update user plan');
    },
  });
};