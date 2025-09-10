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
  monthlyGrowth: Array<{
    month: string;
    growth: number;
  }>;
}

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
  planType?: string;
}