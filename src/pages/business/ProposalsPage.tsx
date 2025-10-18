import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Plus, Eye, Edit, Send, Clock, CheckCircle } from "lucide-react";

export default function ProposalsPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Proposals & SoW</h1>
            <p className="text-text-secondary">Manage your proposals and statements of work</p>
          </div>
          <Button className="btn-primary">
            <Plus className="w-4 h-4 mr-2" />
            New Proposal
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Recent Proposals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {proposals.map((proposal, index) => (
                  <motion.div
                    key={proposal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="p-4 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-text-primary">{proposal.title}</h3>
                      <Badge variant={proposal.status === 'sent' ? 'default' : proposal.status === 'draft' ? 'secondary' : 'destructive'}>
                        {proposal.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-3">{proposal.client}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-text-secondary">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {proposal.date}
                        </div>
                        <div className="text-text-primary font-medium">
                          ${proposal.value.toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
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
                  Create from Template
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <Plus className="w-4 h-4 mr-3" />
                  AI Generate Proposal
                </Button>
                <Button className="w-full justify-start" variant="ghost">
                  <CheckCircle className="w-4 h-4 mr-3" />
                  Review Pending
                </Button>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader>
                <CardTitle className="text-text-primary">Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-borders-strong rounded-lg">
                  <h4 className="font-medium text-text-primary mb-1">Web Development</h4>
                  <p className="text-sm text-text-secondary">Standard web app proposal template</p>
                </div>
                <div className="p-3 border border-borders-strong rounded-lg">
                  <h4 className="font-medium text-text-primary mb-1">AI/ML Project</h4>
                  <p className="text-sm text-text-secondary">Custom AI development proposal</p>
                </div>
                <div className="p-3 border border-borders-strong rounded-lg">
                  <h4 className="font-medium text-text-primary mb-1">Mobile App</h4>
                  <p className="text-sm text-text-secondary">Mobile application development</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

const proposals = [
  {
    id: 1,
    title: "E-commerce Platform Development",
    client: "TechCorp Inc.",
    status: "sent",
    date: "2 days ago",
    value: 50000
  },
  {
    id: 2,
    title: "Data Analytics Dashboard",
    client: "DataFlow Solutions",
    status: "draft",
    date: "1 week ago",
    value: 25000
  },
  {
    id: 3,
    title: "Mobile App Development",
    client: "StartupXYZ",
    status: "rejected",
    date: "2 weeks ago",
    value: 75000
  }
];