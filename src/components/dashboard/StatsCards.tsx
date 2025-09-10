import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserPlanAnalytics } from '@/types/dashboard';

interface StatsCardsProps {
  data: UserPlanAnalytics;
}

const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  const stats = [
    {
      title: "Jami foydalanuvchilar",
      value: data.totalUsers,
      description: "Ro'yxatdan o'tgan barcha foydalanuvchilar"
    },
    {
      title: "Faol obunalar",
      value: data.activeSubscriptions,
      description: "Hozirda faol obunalar soni"
    },
    {
      title: "Muddati o'tgan obunalar",
      value: data.expiredSubscriptions,
      description: "Muddati tugagan obunalar"
    },
    {
      title: "Umumiy daromad",
      value: `${data.totalRevenue.toLocaleString()} so'm`,
      description: "Barcha obunalardan tushgan daromad"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;