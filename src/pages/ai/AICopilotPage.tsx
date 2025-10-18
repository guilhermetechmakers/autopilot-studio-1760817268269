import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Bot, Send, FileText, CheckCircle, Clock, Users } from "lucide-react";

export default function AICopilotPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">AI Copilot Workspace</h1>
          <p className="text-text-secondary">Generate specs, criteria, and documentation with AI assistance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary flex items-center">
                  <Bot className="w-5 h-5 mr-2 text-brand-primary" />
                  AI Prompt Console
                </CardTitle>
                <CardDescription className="text-text-secondary">
                  Describe what you need and let AI generate it for you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Describe what you need... e.g., 'Generate acceptance criteria for user authentication feature'"
                  className="min-h-32"
                />
                <div className="flex items-center justify-between">
                  <div className="text-sm text-text-secondary">
                    Tokens used: 1,250 / 10,000
                  </div>
                  <Button className="btn-primary">
                    <Send className="w-4 h-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Recent Generations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentGenerations.map((generation, index) => (
                  <motion.div
                    key={generation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-4 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-text-primary">{generation.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge variant={generation.status === 'approved' ? 'default' : 'secondary'}>
                          {generation.status}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <FileText className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">{generation.description}</p>
                    <div className="flex items-center text-xs text-text-muted">
                      <Clock className="w-3 h-3 mr-1" />
                      {generation.date}
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
                  <FileText className="w-4 h-4 mr-3" />
                  Generate Specs
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <CheckCircle className="w-4 h-4 mr-3" />
                  Acceptance Criteria
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Users className="w-4 h-4 mr-3" />
                  Meeting Notes
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <FileText className="w-4 h-4 mr-3" />
                  Change Requests
                </Button>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Approval Queue</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-surface-elevated rounded-lg">
                  <div className="text-sm font-medium text-text-primary mb-1">API Documentation</div>
                  <div className="text-xs text-text-secondary">Waiting for review</div>
                </div>
                <div className="p-3 bg-surface-elevated rounded-lg">
                  <div className="text-sm font-medium text-text-primary mb-1">Test Cases</div>
                  <div className="text-xs text-text-secondary">Ready for approval</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const recentGenerations = [
  {
    id: 1,
    title: "User Authentication Specs",
    description: "Detailed specifications for login, registration, and password reset functionality",
    status: "approved",
    date: "2 hours ago"
  },
  {
    id: 2,
    title: "API Endpoint Documentation",
    description: "Complete documentation for all REST API endpoints",
    status: "pending",
    date: "1 day ago"
  },
  {
    id: 3,
    title: "Database Schema Design",
    description: "Normalized database schema with relationships and constraints",
    status: "approved",
    date: "3 days ago"
  }
];