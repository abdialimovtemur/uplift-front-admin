import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useUserPlansAnalytics } from '@/api/queries/dashboard';
import SubscriptionChart from './SubscriptionChart';
import PaymentStatusChart from './PaymentStatusChart';
import StatsCards from './StatsCards';
import MonthlyGrowthChart from './MonthlyGrowthChart';

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
        <h1 className="text-3xl font-bold tracking-tight">Obuna statistikasi</h1>
        <p className="text-muted-foreground">
          Foydalanuvchilar obunalari va to'lovlar statistikasi
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-16" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-64 w-full" />
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : data ? (
        <>
          <StatsCards data={data} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SubscriptionChart data={data.subscriptionTypes} />
            <PaymentStatusChart data={data.paymentStatuses} />
          </div>

          <MonthlyGrowthChart data={data.monthlyGrowth} />
        </>
      ) : null}
    </div>
  );
};

export default UserPlansAnalytics;