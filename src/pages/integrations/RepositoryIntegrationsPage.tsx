import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, GitBranch, CheckCircle, AlertCircle, Settings } from "lucide-react";

export default function RepositoryIntegrationsPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Repository Integrations</h1>
          <p className="text-text-secondary">Connect and manage your code repositories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary">Connected Repositories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {repositories.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-4 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <Github className="w-5 h-5 text-text-primary" />
                      <div>
                        <h3 className="font-medium text-text-primary">{repo.name}</h3>
                        <p className="text-sm text-text-secondary">{repo.owner}</p>
                      </div>
                    </div>
                    <Badge variant={repo.status === 'connected' ? 'default' : 'destructive'}>
                      {repo.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center">
                        <GitBranch className="w-4 h-4 mr-1" />
                        {repo.branch}
                      </div>
                      <div>Last sync: {repo.lastSync}</div>
                    </div>
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
              <CardTitle className="text-text-primary">Add New Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <Button className="w-full justify-start h-16" variant="outline">
                  <Github className="w-6 h-6 mr-4" />
                  <div className="text-left">
                    <div className="font-medium">GitHub</div>
                    <div className="text-sm text-text-secondary">Connect your GitHub repositories</div>
                  </div>
                </Button>
                <Button className="w-full justify-start h-16" variant="outline">
                  <GitBranch className="w-6 h-6 mr-4" />
                  <div className="text-left">
                    <div className="font-medium">GitLab</div>
                    <div className="text-sm text-text-secondary">Connect your GitLab repositories</div>
                  </div>
                </Button>
                <Button className="w-full justify-start h-16" variant="outline">
                  <GitBranch className="w-6 h-6 mr-4" />
                  <div className="text-left">
                    <div className="font-medium">Bitbucket</div>
                    <div className="text-sm text-text-secondary">Connect your Bitbucket repositories</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="surface-card mt-8">
          <CardHeader>
            <CardTitle className="text-text-primary">Webhook Status & Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {webhookLogs.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-surface-elevated rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {log.status === 'success' ? (
                      <CheckCircle className="w-4 h-4 text-states-success" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-states-danger" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-text-primary">{log.event}</div>
                      <div className="text-xs text-text-secondary">{log.repository}</div>
                    </div>
                  </div>
                  <div className="text-xs text-text-muted">{log.timestamp}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

const repositories = [
  {
    id: 1,
    name: "ecommerce-platform",
    owner: "techcorp",
    status: "connected",
    branch: "main",
    lastSync: "2 hours ago"
  },
  {
    id: 2,
    name: "data-analytics",
    owner: "dataflow",
    status: "error",
    branch: "develop",
    lastSync: "1 day ago"
  }
];

const webhookLogs = [
  {
    id: 1,
    event: "Push to main",
    repository: "ecommerce-platform",
    status: "success",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    event: "Pull request merged",
    repository: "data-analytics",
    status: "success",
    timestamp: "4 hours ago"
  },
  {
    id: 3,
    event: "Webhook failed",
    repository: "mobile-app",
    status: "error",
    timestamp: "1 day ago"
  }
];