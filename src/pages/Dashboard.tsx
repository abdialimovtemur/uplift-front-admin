// pages/Dashboard.tsx
import { useAuth } from '@/providers/AuthProvider'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={logout} variant="outline">
          Logout
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {user?.name}!</CardTitle>
        </CardHeader>
        <CardContent>
          <p>You are logged in as {user?.role}.</p>
          <p className="mt-2">Email: {user?.email}</p>
          {user?.phone && <p>Phone: {user?.phone}</p>}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Total Users: 1,234</p>
            <p>Active Sessions: 56</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No recent activity</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <p>All systems operational</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Dashboard