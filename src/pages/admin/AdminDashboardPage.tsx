import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart3, Settings, Shield, Activity, AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Admin Dashboard</h1>
          <p className="text-text-secondary">Manage your workspace and monitor system health</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {adminMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="surface-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary">{metric.title}</p>
                      <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
                    </div>
                    <metric.icon className="w-8 h-8 text-brand-primary" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary">User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-brand-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">{user.name}</div>
                      <div className="text-sm text-text-secondary">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary">System Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {systemHealth.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {item.status === 'healthy' ? (
                      <div className="w-3 h-3 bg-states-success rounded-full"></div>
                    ) : (
                      <AlertCircle className="w-4 h-4 text-states-danger" />
                    )}
                    <span className="text-text-primary">{item.name}</span>
                  </div>
                  <Badge variant={item.status === 'healthy' ? 'default' : 'destructive'}>
                    {item.status}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

const adminMetrics = [
  {
    title: "Total Users",
    value: "156",
    icon: Users
  },
  {
    title: "Active Projects",
    value: "23",
    icon: Activity
  },
  {
    title: "System Uptime",
    value: "99.9%",
    icon: BarChart3
  },
  {
    title: "Security Alerts",
    value: "2",
    icon: Shield
  }
];

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    role: "admin"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@company.com",
    role: "user"
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@company.com",
    role: "user"
  }
];

const systemHealth = [
  {
    name: "API Server",
    status: "healthy"
  },
  {
    name: "Database",
    status: "healthy"
  },
  {
    name: "File Storage",
    status: "healthy"
  },
  {
    name: "Email Service",
    status: "warning"
  }
];