import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserPlansAnalytics } from '@/api/queries/dashboard';
import StatsCards from './StatsCards';
// import RevenueCharts from './RevenueCharts';
import SubscriptionChart from './SubscriptionChart';
import PaymentStatusChart from './PaymentStatusChart';
import MonthlyGrowthChart from './MonthlyGrowthChart';
import WritingAnalytics from './WritingAnalytics';

const UserPlansAnalytics: React.FC = () => {
  const { data, isLoading, error } = useUserPlansAnalytics();

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-destructive">
              Xatolik yuz berdi: {error.message}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive overview of platform performance and user activity
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          {/* Birinchi qator skeleton */}
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-3 w-20 mb-2" />
                        <Skeleton className="h-6 w-16 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Ikkinchi qator skeleton */}
          <div>
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="border-0 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Skeleton className="h-3 w-20 mb-2" />
                        <Skeleton className="h-6 w-16 mb-2" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                      <Skeleton className="h-8 w-8 rounded-lg" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      ) : data ? (
        <>
          <StatsCards data={data} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SubscriptionChart data={data.subscriptionTypes} />
            <PaymentStatusChart data={data.paymentStatuses} />
          </div>

          <MonthlyGrowthChart data={data.monthlyGrowth} />

          <WritingAnalytics data={data} />

          {/* <RevenueCharts data={data} /> */}
        </>
      ) : null}
    </div>
  );
};

export default UserPlansAnalytics;