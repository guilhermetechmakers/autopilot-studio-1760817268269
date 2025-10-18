import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, FileText, MessageCircle, Download } from "lucide-react";

export default function ClientPortalPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Client Portal</h1>
          <p className="text-xl text-text-secondary">Track your project progress and provide feedback</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary">Project Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-text-primary">E-commerce AI Platform</h3>
                  <p className="text-text-secondary">TechCorp Inc.</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Progress</span>
                  <Badge>75% Complete</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary">Next Milestone</span>
                  <span className="text-text-primary">API Integration</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary">Recent Deliverables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {deliverables.map((deliverable, index) => (
                <motion.div
                  key={deliverable.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 border border-borders-strong rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      deliverable.status === 'approved' ? 'bg-states-success/10' : 'bg-brand-primary/10'
                    }`}>
                      {deliverable.status === 'approved' ? (
                        <CheckCircle className="w-3 h-3 text-states-success" />
                      ) : (
                        <Clock className="w-3 h-3 text-brand-primary" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-text-primary">{deliverable.title}</div>
                      <div className="text-sm text-text-secondary">{deliverable.date}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {deliverable.status === 'approved' ? 'View' : 'Review'}
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="surface-card mt-8">
          <CardHeader>
            <CardTitle className="text-text-primary">Feedback & Communication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="h-20 flex-col space-y-2">
                <MessageCircle className="w-6 h-6" />
                <span>Send Feedback</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <FileText className="w-6 h-6" />
                <span>View Documents</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col space-y-2">
                <Download className="w-6 h-6" />
                <span>Download Assets</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

const deliverables = [
  {
    id: 1,
    title: "UI Design Mockups",
    date: "2 days ago",
    status: "approved"
  },
  {
    id: 2,
    title: "API Documentation",
    date: "1 week ago",
    status: "pending"
  },
  {
    id: 3,
    title: "Database Schema",
    date: "2 weeks ago",
    status: "approved"
  }
];