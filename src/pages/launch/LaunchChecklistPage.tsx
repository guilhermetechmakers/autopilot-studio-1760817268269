import { motion } from "motion/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Rocket, Shield, Zap } from "lucide-react";

export default function LaunchChecklistPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Launch Checklist & Deployment</h1>
          <p className="text-text-secondary">Ensure your project is ready for production launch</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {checklistCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              >
                <Card className="surface-card">
                  <CardHeader>
                    <CardTitle className="text-text-primary flex items-center">
                      <category.icon className="w-5 h-5 mr-2 text-brand-primary" />
                      {category.name}
                    </CardTitle>
                    <CardDescription className="text-text-secondary">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: categoryIndex * 0.1 + itemIndex * 0.05 }}
                        className="flex items-center space-x-3 p-3 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                      >
                        <Checkbox
                          checked={item.completed}
                          className="data-[state=checked]:bg-brand-primary data-[state=checked]:border-brand-primary"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-text-primary">{item.title}</div>
                          <div className="text-sm text-text-secondary">{item.description}</div>
                        </div>
                        <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}>
                          {item.priority}
                        </Badge>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="space-y-6">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Launch Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-text-primary mb-2">75%</div>
                  <div className="text-text-secondary">Ready for Launch</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Completed</span>
                    <span className="text-text-primary">15/20</span>
                  </div>
                  <div className="w-full bg-surface-elevated rounded-full h-2">
                    <div className="bg-brand-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Deployment Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full btn-primary">
                  <Rocket className="w-4 h-4 mr-2" />
                  Deploy to Production
                </Button>
                <Button variant="outline" className="w-full border-borders-strong text-text-primary hover:bg-surface-elevated">
                  <Shield className="w-4 h-4 mr-2" />
                  Dry Run
                </Button>
                <Button variant="outline" className="w-full border-borders-strong text-text-primary hover:bg-surface-elevated">
                  <Zap className="w-4 h-4 mr-2" />
                  Rollback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const checklistCategories = [
  {
    name: "Quality Assurance",
    description: "Testing and quality checks",
    icon: CheckCircle,
    items: [
      {
        id: 1,
        title: "Unit tests passing",
        description: "All unit tests must pass",
        completed: true,
        priority: "high"
      },
      {
        id: 2,
        title: "Integration tests",
        description: "API integration tests completed",
        completed: true,
        priority: "high"
      },
      {
        id: 3,
        title: "User acceptance testing",
        description: "Client approval received",
        completed: false,
        priority: "high"
      }
    ]
  },
  {
    name: "Security",
    description: "Security and compliance checks",
    icon: Shield,
    items: [
      {
        id: 4,
        title: "Security audit",
        description: "Third-party security review",
        completed: true,
        priority: "high"
      },
      {
        id: 5,
        title: "SSL certificate",
        description: "Valid SSL certificate installed",
        completed: true,
        priority: "high"
      },
      {
        id: 6,
        title: "Data encryption",
        description: "Sensitive data properly encrypted",
        completed: false,
        priority: "medium"
      }
    ]
  },
  {
    name: "Performance",
    description: "Performance optimization",
    icon: Zap,
    items: [
      {
        id: 7,
        title: "Load testing",
        description: "Performance under load verified",
        completed: true,
        priority: "medium"
      },
      {
        id: 8,
        title: "CDN setup",
        description: "Content delivery network configured",
        completed: false,
        priority: "low"
      }
    ]
  }
];