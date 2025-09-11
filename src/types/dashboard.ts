export interface MonthlyGrowth {
  month: string;
  count: number;
  revenue: number;
}

export interface ActiveUsers {
  daily: number;
  weekly: number;
  monthly: number;
}

export interface Transactions {
  total: number;
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
}export interface WritingSubmissionTimeline {
  date: string;
  count: number;
}

export interface StatusBreakdown {
  status: string;
  count: number;
}

export interface TopicBreakdown {
  topic: string;
  count: number;
}

export interface ScoreDistribution {
  scoreRange: string | number;
  count: number;
}

export interface WritingSubmissions {
  total: number;
  daily: number;
  weekly: number;
  monthly: number;
  timeline: WritingSubmissionTimeline[];
  statusBreakdown: StatusBreakdown[];
  topicBreakdown: TopicBreakdown[];
  scoreDistribution: ScoreDistribution[];
}

export interface UserPlanAnalytics {
  totalUsers: number;
  activeSubscriptions: number;
  expiredSubscriptions: number;
  totalRevenue: number;
  averageRevenuePerUser: number;
  subscriptionTypes: Array<{
    type: string;
    count: number;
  }>;
  paymentStatuses: Array<{
    status: string;
    count: number;
  }>;
  monthlyGrowth: MonthlyGrowth[];
  activeUsers: ActiveUsers;
  transactions: Transactions;
  writingSubmissions: WritingSubmissions;
}