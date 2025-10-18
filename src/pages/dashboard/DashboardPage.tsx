import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Bot, 
  Plus, 
  Search, 
  Bell, 
  User, 
  TrendingUp, 
  Clock, 
  DollarSign,
  FileText,
  Calendar,
  BarChart3,
  Activity,
  ArrowRight,
  Users,
  CheckCircle
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface-base">
      {/* Top Bar */}
      <header className="border-b border-borders-strong bg-surface-sunken">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-brand-primary to-brand-hover rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-text-primary">Dashboard</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Search projects, clients..."
                className="pl-10 pr-4 py-2 bg-surface-elevated border border-borders-strong rounded-md text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-text-secondary" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">3</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-5 h-5 text-text-secondary" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* Pipeline Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-text-primary mb-4">Pipeline Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pipelineData.map((stage, index) => (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="surface-card">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-text-secondary">{stage.name}</CardTitle>
                      <stage.icon className="w-4 h-4 text-text-muted" />
                    </div>
                    <div className="text-2xl font-bold text-text-primary">{stage.count}</div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm">
                      <span className="text-text-secondary">+{stage.growth}%</span>
                      <TrendingUp className="w-3 h-3 text-states-success ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Active Projects */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="surface-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-text-primary">Active Projects</CardTitle>
                  <Button size="sm" variant="outline" className="border-borders-strong text-text-primary hover:bg-surface-elevated">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {activeProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="p-4 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-text-primary">{project.name}</h3>
                      <Badge variant={project.status === 'on-track' ? 'default' : 'destructive'}>
                        {project.status === 'on-track' ? 'On Track' : 'At Risk'}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{project.client}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Progress</span>
                        <span className="text-text-primary">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {project.nextMilestone}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {project.assignees}
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="text-brand-primary hover:text-brand-hover">
                        View Details
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Copilot Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-brand-primary" />
                  AI Copilot
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Suggested actions and insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                    className="p-3 bg-surface-elevated rounded-lg border border-borders-strong"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <suggestion.icon className="w-3 h-3 text-brand-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-text-primary mb-1">{suggestion.title}</p>
                        <p className="text-xs text-text-secondary">{suggestion.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
                <Button className="w-full btn-primary">
                  <Bot className="w-4 h-4 mr-2" />
                  Open AI Copilot
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-4 h-auto hover:bg-surface-elevated"
                    >
                      <action.icon className="w-5 h-5 mr-3 text-brand-primary" />
                      <div className="text-left">
                        <div className="font-medium text-text-primary">{action.name}</div>
                        <div className="text-sm text-text-secondary">{action.description}</div>
                      </div>
                    </Button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-8 h-8 bg-surface-elevated rounded-full flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-4 h-4 text-brand-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-text-primary">{activity.description}</p>
                      <p className="text-xs text-text-muted">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const pipelineData = [
  { name: "Leads", count: 12, growth: 15, icon: Users },
  { name: "Proposals", count: 8, growth: 8, icon: FileText },
  { name: "Active Projects", count: 5, growth: 25, icon: Activity },
  { name: "Completed", count: 23, growth: 12, icon: CheckCircle }
];

const activeProjects = [
  {
    id: 1,
    name: "E-commerce AI Platform",
    client: "TechCorp Inc.",
    progress: 75,
    status: "on-track",
    nextMilestone: "API Integration",
    assignees: "3 team members"
  },
  {
    id: 2,
    name: "Data Analytics Dashboard",
    client: "DataFlow Solutions",
    progress: 45,
    status: "at-risk",
    nextMilestone: "UI Components",
    assignees: "2 team members"
  },
  {
    id: 3,
    name: "Mobile App Development",
    client: "StartupXYZ",
    progress: 90,
    status: "on-track",
    nextMilestone: "Testing Phase",
    assignees: "4 team members"
  }
];

const aiSuggestions = [
  {
    icon: FileText,
    title: "Generate Proposal",
    description: "Create a proposal for the new lead from Acme Corp"
  },
  {
    icon: Calendar,
    title: "Schedule Meeting",
    description: "Set up a client call for project review"
  },
  {
    icon: BarChart3,
    title: "Update Status Report",
    description: "Generate weekly progress report for stakeholders"
  }
];

const quickActions = [
  {
    name: "New Intake",
    description: "Start AI-assisted client intake process",
    icon: Bot
  },
  {
    name: "Create Proposal",
    description: "Generate new proposal or SoW",
    icon: FileText
  },
  {
    name: "Start Project",
    description: "Set up new project workspace",
    icon: Plus
  },
  {
    name: "Launch Checklist",
    description: "Review deployment readiness",
    icon: CheckCircle
  }
];

const recentActivity = [
  {
    icon: CheckCircle,
    description: "Project 'E-commerce AI Platform' milestone completed",
    time: "2 hours ago"
  },
  {
    icon: FileText,
    description: "New proposal sent to TechCorp Inc.",
    time: "4 hours ago"
  },
  {
    icon: Users,
    description: "New lead qualified: Acme Corp",
    time: "6 hours ago"
  },
  {
    icon: DollarSign,
    description: "Invoice #INV-2024-001 paid",
    time: "1 day ago"
  }
];