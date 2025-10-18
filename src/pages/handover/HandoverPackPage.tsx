import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Video, CheckCircle, Package } from "lucide-react";

export default function HandoverPackPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Handover Pack</h1>
          <p className="text-text-secondary">Generate comprehensive project deliverables</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary">Project Assets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {assets.map((asset, index) => (
                <motion.div
                  key={asset.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <asset.icon className="w-5 h-5 text-brand-primary" />
                    <div>
                      <div className="font-medium text-text-primary">{asset.name}</div>
                      <div className="text-sm text-text-secondary">{asset.description}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={asset.status === 'ready' ? 'default' : 'secondary'}>
                      {asset.status}
                    </Badge>
                    <Button size="sm" variant="ghost">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary">Generate Handover Pack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-states-success" />
                  <span className="text-text-primary">Project Documentation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-states-success" />
                  <span className="text-text-primary">API Documentation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-states-success" />
                  <span className="text-text-primary">Deployment Guide</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-states-success" />
                  <span className="text-text-primary">User Manual</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full btn-primary">
                  <Package className="w-4 h-4 mr-2" />
                  Generate Complete Pack
                </Button>
                <Button variant="outline" className="w-full border-borders-strong text-text-primary hover:bg-surface-elevated">
                  <Download className="w-4 h-4 mr-2" />
                  Download ZIP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="surface-card mt-8">
          <CardHeader>
            <CardTitle className="text-text-primary">SLA & Success Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Support SLA</h3>
                <p className="text-sm text-text-secondary">30-day post-launch support included</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Documentation</h3>
                <p className="text-sm text-text-secondary">Complete technical documentation</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Video className="w-6 h-6 text-brand-primary" />
                </div>
                <h3 className="font-semibold text-text-primary mb-2">Training</h3>
                <p className="text-sm text-text-secondary">Team training sessions included</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

const assets = [
  {
    id: 1,
    name: "Technical Documentation",
    description: "Complete API and system documentation",
    status: "ready",
    icon: FileText
  },
  {
    id: 2,
    name: "Deployment Guide",
    description: "Step-by-step deployment instructions",
    status: "ready",
    icon: FileText
  },
  {
    id: 3,
    name: "User Training Video",
    description: "Comprehensive user training video",
    status: "processing",
    icon: Video
  },
  {
    id: 4,
    name: "Source Code",
    description: "Complete source code repository",
    status: "ready",
    icon: Package
  }
];