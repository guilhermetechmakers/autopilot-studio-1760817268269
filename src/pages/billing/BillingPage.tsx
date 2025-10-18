import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, FileText, Clock, TrendingUp, CreditCard, Download } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="min-h-screen bg-surface-base p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">Billing & Invoicing</h1>
          <p className="text-text-secondary">Manage your financials and billing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {billingMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="surface-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-text-secondary">{metric.title}</p>
                      <p className="text-2xl font-bold text-text-primary">{metric.value}</p>
                    </div>
                    <metric.icon className="w-8 h-8 text-brand-primary" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-states-success mr-1" />
                    <span className="text-sm text-states-success">+{metric.growth}%</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary">Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {invoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-borders-strong rounded-lg hover:bg-surface-elevated transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-brand-primary" />
                    <div>
                      <div className="font-medium text-text-primary">{invoice.number}</div>
                      <div className="text-sm text-text-secondary">{invoice.client}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-text-primary">${invoice.amount.toLocaleString()}</div>
                    <Badge variant={invoice.status === 'paid' ? 'default' : invoice.status === 'pending' ? 'secondary' : 'destructive'}>
                      {invoice.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="surface-card">
            <CardHeader>
              <CardTitle className="text-text-primary">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="ghost">
                <FileText className="w-4 h-4 mr-3" />
                Create Invoice
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <CreditCard className="w-4 h-4 mr-3" />
                Payment Methods
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Download className="w-4 h-4 mr-3" />
                Export Reports
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <TrendingUp className="w-4 h-4 mr-3" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

const billingMetrics = [
  {
    title: "Monthly Revenue",
    value: "$45,000",
    growth: 12,
    icon: DollarSign
  },
  {
    title: "Outstanding",
    value: "$8,500",
    growth: -5,
    icon: Clock
  },
  {
    title: "Invoices Sent",
    value: "23",
    growth: 8,
    icon: FileText
  },
  {
    title: "Avg. Payment Time",
    value: "12 days",
    growth: -15,
    icon: TrendingUp
  }
];

const invoices = [
  {
    id: 1,
    number: "INV-2024-001",
    client: "TechCorp Inc.",
    amount: 25000,
    status: "paid"
  },
  {
    id: 2,
    number: "INV-2024-002",
    client: "DataFlow Solutions",
    amount: 15000,
    status: "pending"
  },
  {
    id: 3,
    number: "INV-2024-003",
    client: "StartupXYZ",
    amount: 35000,
    status: "overdue"
  }
];