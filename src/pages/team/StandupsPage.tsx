import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, FileText } from "lucide-react";

export default function StandupsPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Standups & Status Reports</h1>
          <p className="text-text-secondary">Automate team standups and status reporting</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Recent Standups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {standups.map((standup, index) => (
                  <motion.div
                    key={standup.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-4 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-text-primary">{standup.title}</h3>
                      <Badge variant={standup.status === 'completed' ? 'default' : 'secondary'}>
                        {standup.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{standup.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {standup.date}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {standup.participants} participants
                        </div>
                      </div>
                      <Button size="sm" variant="ghost">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="ghost">
                  <Calendar className="w-4 h-4 mr-3" />
                  Schedule Standup
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <FileText className="w-4 h-4 mr-3" />
                  Generate Report
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Users className="w-4 h-4 mr-3" />
                  Manage Team
                </Button>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Standup Frequency</label>
                  <select className="w-full p-2 bg-surface-elevated border border-borders-strong rounded-md text-text-primary">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Participants</label>
                  <div className="text-sm text-text-secondary">5 team members</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const standups = [
  {
    id: 1,
    title: "Daily Standup - E-commerce Project",
    description: "Progress update on API integration and UI components",
    status: "completed",
    date: "Today, 9:00 AM",
    participants: 5
  },
  {
    id: 2,
    title: "Weekly Status Report",
    description: "Comprehensive project status and milestone review",
    status: "pending",
    date: "Tomorrow, 2:00 PM",
    participants: 8
  },
  {
    id: 3,
    title: "Sprint Planning Meeting",
    description: "Plan next sprint goals and task assignments",
    status: "completed",
    date: "Yesterday, 10:00 AM",
    participants: 6
  }
];