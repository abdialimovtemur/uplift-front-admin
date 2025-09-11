export type WritingTaskType = 'TASK_ONE' | 'TASK_TWO';

export interface Topic {
  _id: string;
  title: string;
  question: string;
  type: WritingTaskType;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface TopicsResponse {
  data: Topic[];
}

export interface TopicFilters {
  page?: number;
  limit?: number;
  search?: string;
  type?: WritingTaskType | 'ALL';
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}