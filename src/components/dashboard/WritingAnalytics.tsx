import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { UserPlanAnalytics } from '@/types/dashboard';

interface WritingAnalyticsProps {
  data: UserPlanAnalytics;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const WritingAnalytics: React.FC<WritingAnalyticsProps> = ({ data }) => {
  const { writingSubmissions } = data;

  const statusColors: { [key: string]: string } = {
    ANALYZED: 'bg-green-100 text-green-800',
    IDLE: 'bg-blue-100 text-blue-800',
    FAILED_TO_CHECK: 'bg-red-100 text-red-800'
  };

  const topicColors: { [key: string]: string } = {
    GENERATED: 'bg-purple-100 text-purple-800',
    CUSTOM: 'bg-orange-100 text-orange-800'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md p-3 shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-sm">
            Count: <span className="font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Status Breakdown */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Submission Status</CardTitle>
          <CardDescription>Breakdown by analysis status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={writingSubmissions.statusBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status}: ${count}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="status"
                >
                  {writingSubmissions.statusBreakdown.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {writingSubmissions.statusBreakdown.map((item) => (
              <Badge key={item.status} variant="secondary" className={statusColors[item.status]}>
                {item.status}: {item.count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Topic Breakdown */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Topic Distribution</CardTitle>
          <CardDescription>Breakdown by topic type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={writingSubmissions.topicBreakdown}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="topic" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {writingSubmissions.topicBreakdown.map((item) => (
              <Badge key={item.topic} variant="secondary" className={topicColors[item.topic]}>
                {item.topic}: {item.count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Score Distribution */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Score Distribution</CardTitle>
          <CardDescription>Breakdown by score ranges</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={writingSubmissions.scoreDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="scoreRange" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {writingSubmissions.scoreDistribution.map((item, index) => (
              <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800">
                Score {item.scoreRange}: {item.count}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline Overview */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Submission Timeline</CardTitle>
          <CardDescription>Recent submission activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={writingSubmissions.timeline}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="count" 
                  fill="#10b981" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-sm text-muted-foreground mt-4">
            Latest: {writingSubmissions.timeline[0]?.date} - {writingSubmissions.timeline[0]?.count} submissions
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WritingAnalytics;