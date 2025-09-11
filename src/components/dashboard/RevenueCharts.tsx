import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { UserPlanAnalytics } from '@/types/dashboard';

interface RevenueChartsProps {
  data: UserPlanAnalytics;
}

const RevenueCharts: React.FC<RevenueChartsProps> = ({ data }) => {
  // Daily revenue trend (mock data - API dan kelmaydi)
  const dailyRevenueData = [
    { date: '9/27', revenue: 300000 },
    { date: '9/28', revenue: 90000 },
    { date: '9/29', revenue: 80000 },
    { date: '9/30', revenue: 70000 },
    { date: '10/1', revenue: 60000 },
    { date: '10/2', revenue: 50000 },
    { date: '10/3', revenue: 40000 },
    { date: '10/4', revenue: 99999 },
  ];

  // Weekly revenue (mock data)
  const weeklyRevenueData = [
    { week: 'Week 36', revenue: 350000 },
    { week: 'Week 37', revenue: 350000 },
    { week: 'Week 38', revenue: 350000 },
    { week: 'Week 39', revenue: 360000 },
  ];

  // Monthly revenue distribution
  const monthlyRevenueData = [
    { month: 'September', revenue: data.transactions.monthlyRevenue },
    { month: 'August', revenue: 0 }, // Mock data
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-green-600">
            Revenue: <span className="font-bold">UZS {payload[0].value.toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Daily Revenue Trend */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Daily Revenue Trend</CardTitle>
          <CardDescription>Revenue performance over recent days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value) => `UZS ${value.toLocaleString()}`} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: '#059669' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Revenue */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Weekly Revenue</CardTitle>
          <CardDescription>Revenue breakdown by week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis tickFormatter={(value) => `UZS ${value.toLocaleString()}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="revenue" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Revenue Distribution */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Monthly Revenue Distribution</CardTitle>
          <CardDescription>Revenue split across months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `UZS ${value.toLocaleString()}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="revenue" 
                  fill="#8b5cf6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Yearly Revenue */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Yearly Revenue</CardTitle>
          <CardDescription>Annual revenue performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ year: '2025', revenue: data.totalRevenue }]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `UZS ${value.toLocaleString()}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="revenue" 
                  fill="#f59e0b" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueCharts;