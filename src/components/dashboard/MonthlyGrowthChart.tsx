import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { MonthlyGrowth } from '@/types/dashboard';
// import { MonthlyGrowth } from '@/types/dashboard';

interface MonthlyGrowthChartProps {
  data: MonthlyGrowth[];
}

const MonthlyGrowthChart: React.FC<MonthlyGrowthChartProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Oylik o'sish</CardTitle>
          <CardDescription>Oxirgi oylardagi obuna o'sishi</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-80 text-muted-foreground">
            Ma'lumot mavjud emas
          </div>
        </CardContent>
      </Card>
    );
  }

  // Ma'lumotlarni formatlash
  const chartData = data.map(item => ({
    month: item.month,
    count: item.count,
    revenue: item.revenue
  }));

  // Oylarni formatlash
  const formatMonth = (month: string) => {
    const [year, monthNum] = month.split('-');
    const months = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
    return `${months[parseInt(monthNum) - 1]} ${year}`;
  };

  // Tooltip formati
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{formatMonth(label)}</p>
          <p className="text-sm text-blue-500">
            Obunalar: <span className="font-bold">{payload[0].value}</span>
          </p>
          <p className="text-sm text-green-500">
            Daromad: <span className="font-bold">{payload[1].value.toLocaleString()} so'm</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oylik o'sish</CardTitle>
        <CardDescription>Oxirgi oylardagi obuna o'sishi va daromad</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tickFormatter={formatMonth}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                yAxisId="left"
                dataKey="count" 
                name="Obunalar soni" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                yAxisId="right"
                dataKey="revenue" 
                name="Daromad (so'm)" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyGrowthChart;