import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { TopicsResponse, Topic, TopicFilters } from '@/types/topic';
import api from '../api';

export const useTopicsQuery = (filters: TopicFilters) => {
  return useQuery<TopicsResponse, Error>({
    queryKey: ['topics', filters],
    queryFn: () =>
      api.get('/ielts-writing', { params: filters }).then(response => response.data),
    placeholderData: keepPreviousData,
  });
};

export const useTopicDetailQuery = (id: string) => {
  return useQuery<Topic, Error>({
    queryKey: ['topic', id],
    queryFn: () => api.get(`/ielts-writing/${id}`).then(response => response.data),
    enabled: !!id,
  });
};