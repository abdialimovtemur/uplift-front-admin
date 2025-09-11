import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, CreditCard, BarChart3, FileText, Activity, TrendingUp, Calendar, Zap } from 'lucide-react';
import type { UserPlanAnalytics } from '@/types/dashboard';

interface StatsCardsProps {
  data: UserPlanAnalytics;
}

const StatsCards: React.FC<StatsCardsProps> = ({ data }) => {
  // Birinchi qator - Asosiy user ma'lumotlari
  const userStats = [
    {
      title: "Total Users",
      value: data.totalUsers.toLocaleString(),
      description: "Registered users",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Active Subscriptions",
      value: data.activeSubscriptions.toLocaleString(),
      description: "Currently active plans",
      icon: Zap,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Daily Active Users",
      value: data.activeUsers.daily.toLocaleString(),
      description: "Today's active users",
      icon: Activity,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Monthly Active Users",
      value: data.activeUsers.monthly.toLocaleString(),
      description: "This month's active users",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  // Ikkinchi qator - Revenue va submissions ma'lumotlari
  const revenueStats = [
    {
      title: "Total Revenue",
      value: `UZS ${data.totalRevenue.toLocaleString()}`,
      description: "All time earnings",
      icon: CreditCard,
      color: "text-teal-600",
      bgColor: "bg-teal-100"
    },
    {
      title: "Weekly Revenue",
      value: `UZS ${data.transactions.weeklyRevenue.toLocaleString()}`,
      description: "This week's earnings",
      icon: TrendingUp,
      color: "text-indigo-600",
      bgColor: "bg-indigo-100"
    },
    {
      title: "Total Submissions",
      value: data.writingSubmissions.total.toLocaleString(),
      description: "All time writing assessments",
      icon: FileText,
      color: "text-red-600",
      bgColor: "bg-red-100"
    },
    {
      title: "Daily Submissions",
      value: data.writingSubmissions.daily.toLocaleString(),
      description: "Today's writing assessments",
      icon: BarChart3,
      color: "text-amber-600",
      bgColor: "bg-amber-100"
    }
  ];

  const StatCard = ({ stat }: { stat: typeof userStats[0] }) => {
    const Icon = stat.icon;
    return (
      <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs font-medium text-muted-foreground mb-1">
                {stat.title}
              </p>
              <h3 className="text-lg font-bold text-foreground mb-1">
                {stat.value}
              </h3>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Birinchi qator - User ma'lumotlari */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">User Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>

      {/* Ikkinchi qator - Revenue va submissions ma'lumotlari */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Revenue & Activity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {revenueStats.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCards;