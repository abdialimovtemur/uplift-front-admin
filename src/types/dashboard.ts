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
}

export interface DashboardFilters {
  startDate?: string;
  endDate?: string;
  planType?: string;
}


export interface MonthlyGrowth {
  month: string;
  count: number;
  revenue: number;
}

// export interface UserPlanAnalytics {
//   totalUsers: number;
//   activeSubscriptions: number;
//   expiredSubscriptions: number;
//   totalRevenue: number;
//   averageRevenuePerUser: number;
//   subscriptionTypes: Array<{
//     type: string;
//     count: number;
//   }>;
//   paymentStatuses: Array<{
//     status: string;
//     count: number;
//   }>;
//  
// }