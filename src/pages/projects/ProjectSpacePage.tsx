import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Bot, Calendar, Users, GitBranch, FileText, CheckCircle, Clock } from "lucide-react";

export default function ProjectSpacePage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">E-commerce AI Platform</h1>
              <p className="text-text-secondary">TechCorp Inc. • Active Project</p>
            </div>
            <Badge className="bg-states-success/10 text-states-success border-states-success/20">
              On Track
            </Badge>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-text-secondary">
              <Clock className="w-4 h-4 mr-1" />
              Next milestone: API Integration
            </div>
            <div className="flex items-center text-sm text-text-secondary">
              <Users className="w-4 h-4 mr-1" />
              3 team members
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Project Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text-primary">Overall Progress</span>
                    <span className="text-text-primary font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-text-primary">8</div>
                      <div className="text-sm text-text-secondary">Completed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-text-primary">2</div>
                      <div className="text-sm text-text-secondary">In Progress</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-text-primary">3</div>
                      <div className="text-sm text-text-secondary">Pending</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Milestones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-4 p-4 border border-borders-strong rounded-lg"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.status === 'completed' ? 'bg-states-success/10' :
                      milestone.status === 'in-progress' ? 'bg-brand-primary/10' :
                      'bg-surface-elevated'
                    }`}>
                      {milestone.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-states-success" />
                      ) : milestone.status === 'in-progress' ? (
                        <Clock className="w-4 h-4 text-brand-primary" />
                      ) : (
                        <div className="w-2 h-2 bg-text-muted rounded-full" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-text-primary">{milestone.title}</h3>
                      <p className="text-sm text-text-secondary">{milestone.description}</p>
                    </div>
                    <Badge variant={milestone.status === 'completed' ? 'default' : 'secondary'}>
                      {milestone.status}
                    </Badge>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-brand-primary" />
                  AI Copilot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="ghost">
                  <FileText className="w-4 h-4 mr-3" />
                  Generate Specs
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <CheckCircle className="w-4 h-4 mr-3" />
                  Review Criteria
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Calendar className="w-4 h-4 mr-3" />
                  Meeting Notes
                </Button>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center">
                  <GitBranch className="w-5 h-5 mr-2 text-brand-primary" />
                  Repository
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-surface-elevated rounded-lg">
                    <div className="text-sm font-medium text-text-primary">main</div>
                    <div className="text-xs text-text-secondary">Last commit: 2 hours ago</div>
                  </div>
                  <Button className="w-full" variant="outline">
                    View Repository
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const milestones = [
  {
    id: 1,
    title: "Project Setup",
    description: "Initialize repository and development environment",
    status: "completed"
  },
  {
    id: 2,
    title: "UI Components",
    description: "Build core user interface components",
    status: "completed"
  },
  {
    id: 3,
    title: "API Integration",
    description: "Connect frontend to backend services",
    status: "in-progress"
  },
  {
    id: 4,
    title: "Testing & QA",
    description: "Comprehensive testing and quality assurance",
    status: "pending"
  },
  {
    id: 5,
    title: "Deployment",
    description: "Deploy to production environment",
    status: "pending"
  }
];