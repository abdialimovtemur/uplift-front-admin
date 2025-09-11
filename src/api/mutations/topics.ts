import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import type { Topic } from '@/types/topic';
import { toast } from 'sonner';

export const useCreateTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newTopic: Partial<Topic>) => 
      api.post('/ielts-writing', newTopic),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Topic created successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create topic');
    },
  });
};

export const useUpdateTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Topic> }) =>
      api.patch(`/ielts-writing/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Topic updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update topic');
    },
  });
};

export const useDeleteTopicMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/ielts-writing/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      toast.success('Topic deleted successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete topic');
    },
  });
};