import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause, Square, Plus, Download } from "lucide-react";

export default function TimeTrackingPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Time Tracking</h1>
          <p className="text-text-secondary">Track your time and manage billable hours</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Current Timer</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div className="text-6xl font-mono text-text-primary">02:34:15</div>
                <div className="space-y-2">
                  <div className="text-lg text-text-primary">E-commerce AI Platform</div>
                  <div className="text-text-secondary">API Integration - Frontend</div>
                </div>
                <div className="flex justify-center space-x-4">
                  <Button size="lg" className="btn-primary">
                    <Play className="w-5 h-5 mr-2" />
                    Start
                  </Button>
                  <Button size="lg" variant="outline">
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </Button>
                  <Button size="lg" variant="outline">
                    <Square className="w-5 h-5 mr-2" />
                    Stop
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Today's Entries</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {timeEntries.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-brand-primary" />
                      <div>
                        <div className="font-medium text-text-primary">{entry.task}</div>
                        <div className="text-sm text-text-secondary">{entry.project}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-text-primary">{entry.duration}</div>
                      <div className="text-sm text-text-secondary">{entry.billable ? 'Billable' : 'Non-billable'}</div>
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
                  <Plus className="w-4 h-4 mr-3" />
                  Add Entry
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Download className="w-4 h-4 mr-3" />
                  Export Timesheet
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Clock className="w-4 h-4 mr-3" />
                  View Reports
                </Button>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Today's Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Time</span>
                  <span className="text-text-primary font-mono">8h 45m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Billable</span>
                  <span className="text-text-primary font-mono">7h 30m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Non-billable</span>
                  <span className="text-text-primary font-mono">1h 15m</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const timeEntries = [
  {
    id: 1,
    task: "API Integration",
    project: "E-commerce AI Platform",
    duration: "2h 34m",
    billable: true
  },
  {
    id: 2,
    task: "Code Review",
    project: "Data Analytics Dashboard",
    duration: "1h 15m",
    billable: true
  },
  {
    id: 3,
    task: "Team Meeting",
    project: "General",
    duration: "45m",
    billable: false
  }
];